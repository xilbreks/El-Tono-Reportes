import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_Km7yi2dAAjxru5JJLrFYqTPIFubp3q0",
    authDomain: "expedientes-guillen-pruebas.firebaseapp.com",
    projectId: "expedientes-guillen-pruebas",
    storageBucket: "expedientes-guillen-pruebas.appspot.com",
    messagingSenderId: "156771660151",
    appId: "1:156771660151:web:1e1e2e69e5bda583c9b172",
    measurementId: "G-PN8FGGEFX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conexion a la base de datos
const db = getFirestore(app);

// Hacer conexion con la base de datos
const hoteles = db.collection('hoteles');

const snapshot = await hoteles.get();
const lst = snapshot.docs;
console.log(lst);

// Recuperacion de datos
// async function getColabs() {
//     const colabCol = collection(db, 'hoteles');
//     const colabsSnapshot = await getDocs(colabCol);
//     const lstColabs = colabsSnapshot.docs.map(doc => doc.data());

//     console.log('dentro')

//     return lstColabs;
// }

// getColabs();