import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiCliente = {
    obtener: axiosQuery("get", "/cliente", "cliente"),
    obtenerCliente :   withAxios("get", "/cliente"),
    agregarCliente :   withAxios("post", "/cliente"),
    editarCliente :    withAxios("put", "/cliente"),
    eliminarCliente :  withAxios("delete", "/cliente"),
}

export default apiCliente;