import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiInventario = {
    obtener: axiosQuery("get", "/inventario", "inventarioId"),
    obtenerInventario :   withAxios("get", "/inventario"),
    agregarInventario :   withAxios("post", "/inventario"),
    editarInventario :    withAxios("put", "/inventario"),
    eliminarInventario :  withAxios("delete", "/inventario"),
}

export default apiInventario;