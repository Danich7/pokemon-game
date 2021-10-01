import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "home",
    initialState: {
        email: "",
        password: "",
    },
    reducers: {
        Email: (state, action) => ({
            ...state,
            email: action.payload,
        }),
        Password: (state, action) => ({
            ...state,
            password: action.payload,
        }),
    },
});

export const { Email, Password } = slice.actions;

export const emailState = state => state.home.email;
export const passwordState = state => state.home.password;

export default slice.reducer;
