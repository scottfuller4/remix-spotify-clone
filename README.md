# Spotify Playlists UI Clone

## Overview

This app is a simplified recreation of the Playlists UI of the Spotify Web App. Using the Spotify Developers API, it allows users to log in to their Spotify account to see the playlists they have created.

If you do not have a Spotify account or do not use custom playlists, please reach out, and I'll send you my credentials to log in.

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

This should get the app running at [http://localhost:8888](http://localhost:8888), where you will see the login page. After logging in, you receive an auth token from Spotify that is saved as a cookie. This token expires after 1 hour, and due to time limitations, the refresh auth flow was not implemented. If the token expires, please delete the cookie and return to [http://localhost:8888](http://localhost:8888) to log in again.

## Why This Project?

I chose to build this app because it highlights several of my skills as a Frontend Developer and provided an opportunity to learn Remix. Initially, I created this app with Vue.js, but I later migrated it to a stack similar to what Mejuri uses.

### Key Skills Demonstrated:

- Interaction with an external REST API (Spotify API)
- Modular code and component-based architecture
- Styling with Tailwind CSS and custom styles
- TypeScript for type safety and maintainability

## Technical Considerations

While building this project, I made several key decisions:

- **Server choice**: Instead of using the default Remix server, I opted for a custom Express server.
- **CSS strategy**: From inspecting the Mejuri website, it appeared Tailwind CSS was in use, so I followed that approach.
- **Routing structure**: Since I was only building a portion of the Spotify UI, I had to decide the best way to structure routing.

## Technical Challenges

1. **Refresh token flow**:

   - Initially, I passed the access and refresh tokens as URL parameters but later switched to cookies for a better UX.
   - This change broke the refresh flow, and I was unable to fully implement a fix within the time constraints.

2. **Tailwind CSS setup issues**:

   - Some Tailwind classes worked initially while others did not.
   - After reviewing the documentation, I realized the package required specific initialization steps for Vite.
   - Once configured correctly, Tailwind functioned as expected.

## Future Improvements

If given more time, here are the features and improvements I would add:

- **Music playback**: My initial goal was to allow the app to play music, but I descoped this feature due to time limitations.
- **Better responsiveness and accessibility**: While some basic measures are in place, the experience is optimized for web rather than mobile.
- **Performance enhancements**: Optimize navigation between playlists for a smoother experience.
- **Error handling**: Currently, the app lacks error states, which would be a priority to implement.
- **Testing**: Adding unit and integration tests for better reliability.
- **More modular components**: Breaking down components into smaller, reusable units for better scalability.
- **Headless CMS integration**: Using a Headless CMS for better content management.

---

This project showcases my ability to build a functional, real-world frontend application while balancing learning and problem-solving. I look forward to feedback and chatting more about it!
