import create from "zustand";

const [useStore] = create( set =>({
    show: true,
    setShow: (value) => set( () =>{
        localStorage.setItem("showSidebar", value)
        return{ 
            show : value   
        }
    }),
}));

export default useStore;