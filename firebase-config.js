// Firebase config for felt. (project: felt-69d38)
// Uses the compat SDK via CDN — no npm install needed for GitHub Pages.

const firebaseConfig = {
  apiKey: "AIzaSyCeOFmggTPsbecPVZeQKnAChLue3HgQvNE",
  authDomain: "felt-69d38.firebaseapp.com",
  projectId: "felt-69d38",
  storageBucket: "felt-69d38.firebasestorage.app",
  messagingSenderId: "479722297208",
  appId: "1:479722297208:web:2e2376f84dff63289ada8d",
  measurementId: "G-YT5F2FVNDR"
};

let firebaseReady = false;
let auth = null;
let db = null;

try {
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();
  firebaseReady = true;
  console.log("Firebase ready");
} catch (e) {
  console.warn("Firebase init failed, using localStorage fallback:", e);
}
