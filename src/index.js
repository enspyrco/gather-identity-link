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

import { config } from './config'
import { getApps, initializeApp } from 'firebase/app';

import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(config.firebase);
  const firestore = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp);
  return { firebaseApp, firestore, auth, isConfigured };
}

function connectToEmulators({auth, firestore}) {
  if(location.hostname === 'localhost') {
    connectFirestoreEmulator(firestore, 'localhost', 8081);
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
}

function getFirebase() {
  const services = initializeServices();
  if(!services.isConfigured) {
    connectToEmulators(services);
  }
  return services;
}

const loginEmailPassword = async () => {
  const { auth } = getFirebase();

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

const signupEmailPassword = async () => {
  const { auth } = getFirebase();

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
  const { auth } = getFirebase();

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
  const { auth } = getFirebase();
  
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword)
btnSignup.addEventListener("click", signupEmailPassword)
btnLinkGather.addEventListener("click", linkGather)
btnLinkGitHub.addEventListener("click", linkGitHub)
btnLogout.addEventListener("click", logout)

monitorAuthState();
