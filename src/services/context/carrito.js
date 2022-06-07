import create from 'zustand';

const fetchLocalCarrito = () => {
    const carrito = localStorage.getItem('carrito');
    return carrito != null ? JSON.parse(carrito) : [];
};

const useCarrito = create((set, get) => ({
    carrito: fetchLocalCarrito(),
    addItem: (item) =>
        set((state) => {
            const carrito = [...state.carrito, item];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            return {
                carrito,
            };
        }),
    editItem: (id, value) =>
        set((state) => {
            if (value < 1) {
                alert('el producto no puede tener un valor menor a 1');
                return get().carrito;
            }

            const carrito = state.carrito.map((item) => {
                if (item.id === id) {
                    item.quantity = value;
                }
                return item;
            });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            return {
                carrito,
            };
        }),
    removeItem: (id) =>
        set((state) => {
            const carrito = state.carrito.filter((item) => {
                console.log(id, item.id, item.id !== id);
                return item.id !== id;
            });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            return {
                carrito,
            };
        }),
    nukeItems: () =>
        set(() => {
            localStorage.removeItem('carrito');
            return {
                carrito: [],
            };
        }),
    existItem: (productoId) =>
        set(() => {
            return get().carrito.find((value) => value.id === productoId);
        }),
}));

export default useCarrito;
