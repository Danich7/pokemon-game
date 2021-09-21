import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyBnsCx9TO1kFkw9BVFzVs4oIQMJ0zI9mL8",
    authDomain: "pokemon-game-6459c.firebaseapp.com",
    databaseURL: "https://pokemon-game-6459c-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-6459c",
    storageBucket: "pokemon-game-6459c.appspot.com",
    messagingSenderId: "215000617794",
    appId: "1:215000617794:web:a33c4d9d910db1dfe06edb"
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;
