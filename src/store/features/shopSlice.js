import { createSlice } from '@reduxjs/toolkit';

const initialFavorites = {
    cart: [],
    favorites: [],
};

/* Creating a slice of the Redux store. */
export const shopSlice = createSlice({
    name: 'cart',
    initialState: initialFavorites,
    reducers: {
        addItem: (state, action) => {
            state.cart = [action.payload, ...state.cart];
        },
        editItem: (state, action) => {
            const { id, quantity } = action.payload;
            state.cart = state.cart.map((val) => {
                if (val.id === id) val.quantity = quantity;
                return val;
            });
        },
        removeItem: (state, action) => {
            const { id } = action.payload;
            state.cart = state.cart.filter((val) => val.id !== id);
        },
        nukeCart: (state) => {
            state.cart = [];
        },
        addFav: (state, action) => {
            state.favorites = [action.payload, ...state.favorites];
        },
        removeFav: (state, action) => {
            const { id } = action.payload;
            state.favorites = state.favorites.filter((val) => val.id !== id);
        },
        nukeFavs: (state) => {
            state.favorites = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { addFav, editFav, removeFav, nukeFavs } = shopSlice.actions;
export const { addItem, editItem, removeItem, nukeCart } = shopSlice.actions;

export default shopSlice.reducer;
