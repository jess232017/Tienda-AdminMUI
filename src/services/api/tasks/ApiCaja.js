import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiCaja = {
    obtener: axiosQuery("get", "/caja", "caja"),
    editar: axiosMutator("post", "/caja", "caja"),
    obtenerCaja :   withAxios("get", "/caja"),
    agregarCaja :   withAxios("post", "/caja"),
    editarCaja :    withAxios("put", "/caja"),
    eliminarCaja :  withAxios("delete", "/caja"),
}

export default apiCaja;