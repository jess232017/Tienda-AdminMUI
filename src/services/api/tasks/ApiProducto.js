import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiProducto = {
    obtener: axiosQuery("get", "/producto", "producto"),
    obtenerProducto :   withAxios("get", "/Producto"),
    agregarProducto :   withAxios("post", "/Producto"),
    editarProducto :    withAxios("put", "/Producto"),
    eliminarProducto :  withAxios("delete", "/Producto"),
}

export default apiProducto;