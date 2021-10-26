import create from "zustand";

const [useStore] = create( set =>({
    show: {
        isOpen: 'dashboard',
        locale: 'en',
        rtlLayout: false,
        darkMode: false
    },
    setOpen: (value) => set( state =>{
        localStorage.setItem("isOpen", value)
        const show = state?.show;
        show.isOpen = value;
        return show;
    }),
    setLocale: (value) => set( state =>{
        localStorage.setItem("locale", value)
        const show = state?.show;
        show.locale = value;
        return show;
    }),
    setDarkMode: (value) => set( state =>{
        localStorage.setItem("darkMode", value)
        const show = state?.show;
        show.darkMode = value;
        return show;
    }),
}));

export default useStore;