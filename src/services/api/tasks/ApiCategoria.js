import {axiosQuery, axiosMutator} from '../utilities/core';

const apiCategoria = {
    obtener: axiosQuery("get", "/categoria", "category"),
    obtenerCategoria :   axiosQuery("get", "/categoria", "category-only"),
    obtenerProductos :   axiosQuery("get", "/producto/categoria", "categoryItems"),
    agregarCategoria :   axiosMutator("post", "/categoria", "category"),
    editarCategoria :    axiosMutator("put", "/categoria", "category"),
    eliminarCategoria :  axiosMutator("delete", "/categoria", "category"),
}

export default apiCategoria;