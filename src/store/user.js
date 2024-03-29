import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "user",
    initialState: {
        isLoading: true,
        data: {},
    },
    reducers: {
        fetchUser: () => ({
            isLoading: true,
        }),
        updateUser: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        removeUser: () => ({
            isLoading: false,
            data: {},
        }),
    },
});

export const { fetchUser, updateUser, removeUser } = slice.actions;

export const selectUserLoading = state => state.user.isLoading;
export const selectUserData = state => state.user.data;
export const selectLocalID = state => state.user.data?.localId;

export const getUserUpdateAsync = () => async (dispatch) => {
    const idToken = localStorage.getItem("idToken");

    if (idToken) {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                idToken,
            }),
        };

        const responce = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBnsCx9TO1kFkw9BVFzVs4oIQMJ0zI9mL8", requestOptions).then(res => res.json());

        if (responce.hasOwnProperty("error")) {
            localStorage.removeItem("idToken");
            dispatch(removeUser());
        } else {
            dispatch(updateUser(responce.users[0]));
        };

    } else {
        dispatch(removeUser());
    };
};

export const getUserAsync = () => (dispatch) => {
    dispatch(fetchUser());
    dispatch(getUserUpdateAsync());
};

export default slice.reducer;
