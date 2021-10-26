import create from "zustand";
import { confirmDialog } from 'primereact/confirmdialog';
import { confirmPopup } from 'primereact/confirmpopup';

const fetchLocalCarrito = () =>{
    const carrito = localStorage.getItem("carrito");
    return (carrito != null) ? JSON.parse(carrito) : [];
}

const confirmarBorrar = (event, carrito, key) => {
    const filtrar = () =>{
        carrito = carrito.filter( item => item.key !== key);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        return carrito;
    }

    return new Promise( (resolve) =>{
        const props = {
            message: '¿Seguro que quieres eliminar este producto?',
            header: '¿Confirmar acción?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            acceptLabel: "Estoy seguro",
            acceptIcon: "pi pi-trash",
            rejectLabel: "No estoy seguro",
            accept: () => resolve(filtrar),
            reject: () => resolve(carrito)
        }
        
        if(event != null){
            props.target = event.currentTarget;
            confirmPopup(props);
        }else{
            confirmDialog(props);
        }
    })
}

const [useCarrito] = create( (set, get) =>({
    carrito: fetchLocalCarrito(),
    addItem: (key, nombre, precio, cantidad, maximo, imagen) => set( state => {
        const carrito = [...state.carrito, {key, nombre, precio, cantidad, maximo, imagen}];
        localStorage.setItem("carrito", JSON.stringify(carrito))
        return {
            carrito
        }
    }),
    editItem: (key, value) => set( state =>{
        if(value === 0){
            alert("el producto no puede tener un valor menor a 1")
            return get().carrito;
        }
        
        const carrito = state.carrito.map( item => {
            if(item.key === key){
                item.cantidad = value;
            }
            return item;
        })
        localStorage.setItem("carrito", JSON.stringify(carrito));
        return {
            carrito
        }
    }),
    removeItem: async(event, key) => set({
        carrito : await confirmarBorrar(event, get().carrito, key)
    }),
    nukeItems: () => set( () => {
        localStorage.removeItem("carrito");
        return {
            carrito: [],   
        }
    }),
    existItem: (productoId) => set( () =>{
        return get().carrito.find(value => value.key === productoId);
    }),
}));

export default useCarrito;