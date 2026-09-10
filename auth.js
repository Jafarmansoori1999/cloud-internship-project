import { auth } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const authForm = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");
const formTitle = document.getElementById("form-title");
const toggleBtn = document.getElementById("toggle-btn");
const errorMsg = document.getElementById("error-message");

let isLogin = true;

// Toggle Login / Sign Up
toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.innerText = isLogin ? "Login" : "Sign Up";
  submitBtn.innerText = isLogin ? "Login" : "Sign Up";
  toggleBtn.innerText = isLogin ? "Need an account? Sign Up" : "Already have an account? Login";
  errorMsg.innerText = "";
});

// Submit Form Logic
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  errorMsg.innerText = "";

  try {
    if (isLogin) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful! Welcome " + userCredential.user.email);
      window.location.href = "index.html";
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created Successfully!");
      window.location.href = "index.html";
    }
  } catch (error) {
    errorMsg.innerText = error.message;
  }
});