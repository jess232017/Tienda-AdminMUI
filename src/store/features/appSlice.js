import { createSlice } from '@reduxjs/toolkit';

const initialApp = {
    setting: {
        fontSize: 0,
        darkMode: false,
        dyslexic: false,
        rtlLayout: false,
        locale: {
            label: 'Español',
            value: 'es',
        },
        isOpen: 'dashboard',
        showBar: true,
    },
};

/* Creating a slice of the Redux store. */
export const shopSlice = createSlice({
    name: 'app',
    initialState: initialApp,
    reducers: {
        setOpen: (state, action) => {
            state.setting.isOpen = action.payload;
        },
        setShowBar: (state, action) => {
            state.setting.showBar = action.payload;
        },
        setLocale: (state, action) => {
            state.setting.locale = action.payload;
        },
        setDarkMode: (state, action) => {
            state.setting.darkMode = action.payload;
        },
        setDyslexic: (state, action) => {
            state.setting.dyslexic = action.payload;
        },
        setFontSize: (state, action) => {
            state.setting.fontSize = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setOpen, setShowBar, setLocale, setDarkMode, setDyslexic, setFontSize } = shopSlice.actions;

export default shopSlice.reducer;
