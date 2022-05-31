import create from 'zustand';

const useStore = create((set) => ({
    show: {
        isOpen: 'dashboard',
        locale: 'es',
        rtlLayout: false,
        darkMode: false,
        dyslexic: false,
        fontSize: 0,
    },
    setOpen: (value) =>
        set((state) => {
            localStorage.setItem('isOpen', value);
            const show = state?.show;
            show.isOpen = value;
            return show;
        }),
    setLocale: (value) =>
        set((state) => {
            localStorage.setItem('locale', value);
            return {
                locale: value,
                ...state,
            };
        }),
    setDarkMode: () =>
        set((state) => {
            const show = state?.show;
            show.darkMode = !show.darkMode;
            localStorage.setItem('darkMode', show.darkMode);
            return show;
        }),
    setDyslexic: () =>
        set((state) => {
            const show = state?.show;
            show.dyslexic = !show.dyslexic;
            localStorage.setItem('dyslexic', show.dyslexic);
            return show;
        }),
    setFont: (value) =>
        set((state) => {
            const show = state?.show;
            show.fontSize = value;
            return show;
        }),
}));

export default useStore;
