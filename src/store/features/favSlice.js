import { createSlice } from '@reduxjs/toolkit';

const initialFavorites = {
    favorites: [],
};

/* Creating a slice of the Redux store. */
export const shopSlice = createSlice({
    name: 'favorites',
    initialState: initialFavorites,
    reducers: {
        add: (state, action) => {
            state.favorites = [action.payload, ...state.favorites];
        },
        remove: (state, action) => {
            const { episode } = action.payload;
            state.favorites = state.favorites.filter((val) => val.episode !== episode);
        },
    },
});

// Action creators are generated for each case reducer function
export const { add, remove } = shopSlice.actions;

export default shopSlice.reducer;
