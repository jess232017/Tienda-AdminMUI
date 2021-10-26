import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiMovimiento = {
    obtener: axiosQuery("get", "/movimiento", "movimiento"),
    obtenerMovimiento :   withAxios("get", "/movimiento"),
    agregarMovimiento :   withAxios("post", "/movimiento"),
    editarMovimiento :    withAxios("put", "/movimiento"),
    eliminarMovimiento :  withAxios("delete", "/movimiento"),
}

export default apiMovimiento;