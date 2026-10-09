# StudyVault Upgrade

A responsive, dependency-light student dashboard for GitHub Pages.

## Features
- Task creation, completion, deletion, and filters
- Subject creation/deletion with progress derived from linked tasks
- 25-minute Pomodoro timer with start, pause, reset, and completed-session count
- Light/dark theme preference
- Local browser persistence using `localStorage`
- JSON backup export
- Mobile navigation and responsive layout
- No build step or backend required

## Deploy to your existing GitHub Pages repository
1. Download and unzip this package.
2. Open your repository: https://github.com/tushar-yerkude/studyvault-
3. Back up or rename the existing `index.html`, `styles.css`, and `app.js` if present.
4. Upload these three files to the repository root (same level as the existing homepage).
5. Commit the changes to the branch/folder configured in **Settings → Pages**.
6. Wait for the Pages deployment to finish, then hard-refresh the website.

## Data and limitations
- Tasks, subjects, focus-session count, and theme are stored in the current browser's local storage.
- Data does not automatically sync between devices or browsers.
- Use **Export my data** to download a JSON backup.
- This is a static front-end. Real accounts, cloud sync, shared uploads, or secure user management require a backend service.

## Local testing
Open `index.html` in a modern browser, or use a local static server. GitHub Pages is not required for basic testing.
