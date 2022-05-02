import create from 'zustand';

const useStore = create((set) => ({
    show: {
        isOpen: 'dashboard',
        locale: 'es',
        rtlLayout: false,
        darkMode: false,
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
            const show = state?.show;
            show.locale = value;
            return show;
        }),
    setDarkMode: () =>
        set((state) => {
            const show = state?.show;
            show.darkMode = !show.darkMode;
            localStorage.setItem('darkMode', show.darkMode);
            console.log(show);
            return show;
        }),
}));

export default useStore;
