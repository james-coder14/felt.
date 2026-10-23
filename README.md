# felt.

how are you feeling?
felt. turns that into a playlist.

## files (all in one place — no folders)

- index.html
- styles.css
- firebase-config.js   ← your Firebase keys are already in here
- data.js
- ai.js
- app.js
- README.md

## deploy to GitHub Pages

1. create a new repo
2. upload these files to the root (no folders)
3. Settings → Pages → Deploy from branch → main → / (root)
4. live at https://YOUR_USERNAME.github.io/REPO_NAME/

## firebase

config is already filled in for project felt-69d38.

in the Firebase console also:
1. Authentication → Sign-in method → enable Anonymous
2. Firestore Database → create database (test mode is fine while building)

without those two steps, playlists still save on the device via localStorage.
