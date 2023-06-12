import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCFJygg6KJ7JT-ei2L5pUwOABoMrWyG6EY",
    authDomain: "fir-app-23e59.firebaseapp.com",
    projectId: "fir-app-23e59",
    storageBucket: "fir-app-23e59.appspot.com",
    messagingSenderId: "883944566938",
    appId: "1:883944566938:web:ad2f886725e2cb81a36f23",
    measurementId: "G-8850G5D81G"
  };

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }