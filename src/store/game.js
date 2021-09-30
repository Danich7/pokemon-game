import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "game",
    initialState: {
        player1: {},
        player2: [],
        winner: 0,
        error: null,
    },
    reducers: {
        player2Set: (state, action) => ({
            ...state,
            player2: action.payload,
        }),
        clean: (state, action) => ({
            player1: {},
            player2: [],
            winner: 0,
        }),
        setWinner: (state, action) => ({
            ...state,
            winner: action.payload,
        }),
        pokemonState: (state, action) => {
            const {key, value} = action.payload;
            let pl1 = state.player1;

            if (pl1[key]) {
                const copyCards = {...state.player1};
                delete copyCards[key];
                pl1 = copyCards;
            } else {
                pl1 = {...pl1, [key]: value};
            };

            return ({
                ...state,
                player1: pl1,
            });
        },
        error: (state, action) => ({
            player1: {},
            player2: [],
            error: action.payload,
        }),

        // fetchPokemonsReject: (state, action) => ({
        //     ...state,
        //     isLoading: false,
        //     data: {},
        //     error: action.payload,
        // }),
    },
});

export const { player2Set, setWinner, pokemonState, clean, error } = slice.actions;

export const player1Card = state => state.game.player1;
export const player2Card = state => state.game.player2;
export const winnerPl = state => state.game.winner;

// export const gameState = state => state.game;

export default slice.reducer;
