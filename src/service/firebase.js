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

class Firebase {
    constructor() {
        this.fire = firebase;
        this.database = this.fire.database();
    };

    getPokemonSoket = (cb) => {
        this.database.ref("pokemons").on("value", (snapshot) => {
            cb(snapshot.val());
        });
    };

    offPokemonSoket = () => {
        this.database.ref("pokemons").off();
    };

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once("value").then(snapshot => snapshot.val());
    };

    postPokemon = (key, pokemon) => {
        this.database.ref(`pokemons/${key}`).set(pokemon);
    };

    addPokemon = (data) => {
        const newKey = this.database.ref().child('pokemons').push().key;
        this.database.ref('pokemons/' + newKey).set(data);
    };
};

const FirebaseClass = new Firebase();

export default FirebaseClass;
