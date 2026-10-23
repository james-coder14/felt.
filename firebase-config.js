// ============================================================
// FIREBASE CONFIG — Replace with your own project credentials
// ============================================================
// 1. Go to https://console.firebase.google.com/
// 2. Create a project (or use existing)
// 3. Add a Web app
// 4. Copy the firebaseConfig object below
// 5. Enable Authentication → Anonymous (or Email/Password)
// 6. Create a Firestore database (start in test mode for now)
// ============================================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize only if real config is present
let firebaseReady = false;
let auth = null;
let db = null;

try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    firebaseReady = true;
    console.log("Firebase ready");
  } else {
    console.warn("Firebase not configured — running in local-only mode. Playlists will be saved to localStorage.");
  }
} catch (e) {
  console.warn("Firebase init failed, using localStorage fallback:", e);
}
