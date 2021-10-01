import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons";
import gameReducer from "./game";
import homeReducer from "./home";

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        game: gameReducer,
        home: homeReducer,
    },
});
