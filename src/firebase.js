import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARZz1L5g7HKTmvrnxdnjoTsfa7iL87wPQ",
  authDomain: "redux-linkedin-clone.firebaseapp.com",
  projectId: "redux-linkedin-clone",
  storageBucket: "redux-linkedin-clone.appspot.com",
  messagingSenderId: "44909773140",
  appId: "1:44909773140:web:e25ca7774bcfb029e188c1"
};

  const firebaseApp = firebase.initializeApp (firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth, firebaseApp};

  