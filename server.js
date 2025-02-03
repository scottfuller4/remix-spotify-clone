import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createRequestHandler } from "@remix-run/express";
import dotenv from "dotenv";

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

dotenv.config(); // Load environment variables

const client_id = "44e3e94ea6dc4a56ac500176c2dfc197";
const client_secret = "06e37741f49b4ae89628e43b0085d07d";
const redirect_uri = "http://localhost:8888/callback";
const front_end_address = "http://localhost:8888";

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    possible.charAt(Math.floor(Math.random() * possible.length))
  ).join("");
};

const stateKey = "spotify_auth_state";

const app = express();
app.use(
  viteDevServer ? viteDevServer.middlewares : express.static("build/client")
);
const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import("./build/server/index.js");
app.use(cors());
app.use(cookieParser());

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope =
    "user-read-private user-read-email user-read-currently-playing user-read-playback-state user-top-read user-library-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
        state,
      }).toString()
  );
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (!state || state !== storedState) {
    return res.redirect(
      "/#" + new URLSearchParams({ error: "state_mismatch" }).toString()
    );
  }

  res.clearCookie(stateKey);

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          redirect_uri,
          grant_type: "authorization_code",
        }).toString(),
      }
    );

    const body = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Failed to fetch token:", body);
      return res.redirect(
        "/#" + new URLSearchParams({ error: "invalid_token" }).toString()
      );
    }

    if (tokenResponse.ok) {
      const { access_token, refresh_token } = body;

      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.redirect(front_end_address + "/");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    res.redirect("/");
  }
});

app.get("/refresh_token", async (req, res) => {
  const refresh_token = req.query.refresh_token;

  res.clearCookie(stateKey);

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }).toString(),
    });

    const body = await response.json();

    if (response.ok) {
      res.json({ access_token: body.access_token });
      res.cookie("access_token", body.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    } else {
      res.status(400).json({ error: "Invalid refresh token" });
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Remix request handler
app.all("*", createRequestHandler({ build }));

app.listen(8888, () => {
  console.log("Listening on http://localhost:8888");
});
