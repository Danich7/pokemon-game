import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../service/firebase";
import { selectLocalID } from "./user";

export const slice = createSlice({
    name: "pokemons",
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
        addPokemonCard: state => (state),
    },
});

export const { fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject, addPokemonCard } = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectLocalID(getState());

    dispatch(fetchPokemons());   

    const data = await fetch(`https://pokemon-game-6459c-default-rtdb.firebaseio.com/${localId}/pokemons.json`).then(res => res.json());

    dispatch(fetchPokemonsResolve(data));
};

export const addOnePokemon = (pokemon) => async (dispatch) => {
    FirebaseClass.addPokemon(pokemon, () => dispatch(addPokemonCard()));
};

export default slice.reducer;
