import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiProveedor = {
    obtener: axiosQuery("get", "/proveedor", "proveedor"),
    obtenerProveedor :   withAxios("get", "/proveedor"),
    agregarProveedor :   withAxios("post", "/proveedor"),
    editarProveedor :    withAxios("put", "/proveedor"),
    eliminarProveedor :  withAxios("delete", "/proveedor"),
}

export default apiProveedor;