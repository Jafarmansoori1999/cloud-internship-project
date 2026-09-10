import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzGrxpkAwe6amjtjnR25nDMsDKcgWfamQ",
  authDomain: "cloud-internship-project-28698.firebaseapp.com",
  projectId: "cloud-internship-project-28698",
  storageBucket: "cloud-internship-project-28698.firebasestorage.app",
  messagingSenderId: "754344322048",
  appId: "1:754344322048:web:ac622f1940313101db64e5",
  measurementId: "G-PG7VJ5J91M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;