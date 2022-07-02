import './styles.css';
import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLinkGather,
  btnLinkGitHub,
  btnLogout
} from './ui'

import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUdxGEMisEGRdDrIl0L7tD1AfiiSi0PC0",
  authDomain: "gather-identity-link.firebaseapp.com",
  projectId: "gather-identity-link",
  storageBucket: "gather-identity-link.appspot.com",
  messagingSenderId: "865555838574",
  appId: "1:865555838574:web:06f5aba18dfda488ee187f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  }
}

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    await createUserWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  } 
}

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const gatherId = urlParams.get('gatherPlayerId')
      console.log(`Gather Id: ${gatherId}`);

      hideLoginError()
      hideLinkError()
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}

const linkGather = async () => {
  const nonce = 12345;
  const redirect = encodeURIComponent(`https://gather-identity-link.web.app?nonce=${nonce}&`);
  window.open(`https://gather.town/getPublicId?redirectTo=${redirect}`);
}

const linkGitHub = async () => {
  window.open('http://www.github.com');
}

// Log out
const logout = async () => {
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword) 
btnSignup.addEventListener("click", createAccount)
btnLinkGather.addEventListener("click", linkGather)
btnLinkGitHub.addEventListener("click", linkGitHub)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();
