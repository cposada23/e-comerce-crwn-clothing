import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDjfe7AXyY63PZyaVYa32Ffgni_ZOY47m0",
  authDomain: "crwn-db-b680c.firebaseapp.com",
  projectId: "crwn-db-b680c",
  storageBucket: "crwn-db-b680c.appspot.com",
  messagingSenderId: "957275920024",
  appId: "1:957275920024:web:7f460952cca633d536a2ed",
  measurementId: "G-QJ0KNK1343"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;