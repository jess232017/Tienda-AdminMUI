import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiCategoria = {
    obtener: axiosQuery("get", "/categoria", "categoriaProductos"),
    obtenerCategoria :   withAxios("get", "/categoria"),
    agregarCategoria :   withAxios("post", "/categoria"),
    editarCategoria :    withAxios("put", "/categoria"),
    eliminarCategoria :  withAxios("delete", "/categoria"),
}

export default apiCategoria;