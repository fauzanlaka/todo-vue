import firebase from 'firebase'
import 'firebase/firestore'
//import { config } from 'vue/types/umd';

const firebaseConfig = {
    apiKey: "AIzaSyAVOdwsdHH3hjUJLtdxjH76ZF-CKRMTNBM",
    authDomain: "todo-91520.firebaseapp.com",
    databaseURL: "https://todo-91520.firebaseio.com",
    projectId: "todo-91520",
    storageBucket: "todo-91520.appspot.com",
    messagingSenderId: "54102205443",
    appId: "1:54102205443:web:a934c710748d9374c31a36",
    measurementId: "G-32W1RX8SZ6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore()
firestore.settings({timestampInSnapshot: true})

export default firestore