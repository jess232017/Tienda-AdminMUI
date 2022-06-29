import { configureStore } from '@reduxjs/toolkit';

import appReducer from './features/appSlice';
import shopReducer from './features/shopSlice';
import chatReducer from './features/chatSlice';

//MIDDLEWARE
const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem('applicationState', JSON.stringify(getState()));
        return result;
    };
};

/**
 * If there's something in localStorage, return it.
 * @returns The store is being re-hydrated.
 */
const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
        return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
    }
};

//STORE CONFIGURATION
/* It's creating a store with the reducer and middleware. */
export default configureStore({
    reducer: {
        app: appReducer,
        chat: chatReducer,
        shopping: shopReducer,
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
