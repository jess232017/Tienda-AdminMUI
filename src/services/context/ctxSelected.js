import create from "zustand";

const [ctxSelected] = create( set =>({
    data: {},
    //setData: ( data ) => set( () => data ),
    setData: ( data ) => set( () =>{
        return{ 
            data  
        }
    }),
}));

export default ctxSelected;