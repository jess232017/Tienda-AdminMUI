import {axiosQuery, axiosMutator} from '../utilities/core';

const apiProducto = {
    obtener: axiosQuery("get", "/producto", "producto"),
    obtenerProducto :   axiosQuery("get", "/Producto", "producto-only"),
    getByCategory : axiosQuery("get", "/producto/categoria"),
    agregarProducto :   axiosMutator("post", "/Producto", "producto"),
    editarProducto :    axiosMutator("put", "/Producto", "producto"),
    eliminarProducto :  axiosMutator("delete", "/Producto", "producto"),
}

export default apiProducto;