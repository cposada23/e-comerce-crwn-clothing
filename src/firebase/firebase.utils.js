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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

export const addCollectionAndDocuments = async(colletionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(colletionKey);
  console.log("collectios ref");
  console.log(collectionRef);

  // Bathc right
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    // Randomly generate an id for me
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  });

  return await batch.commit()

}

export const convertCollectionsSanpshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  console.log(transformedCollection);
  
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;