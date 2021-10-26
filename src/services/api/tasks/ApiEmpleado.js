import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiEmpleado = {
    obtener: axiosQuery("get", "/empleado", "empleado"),
    obtenerEmpleado :   withAxios("get", "/empleado"),
    agregarEmpleado :   withAxios("post", "/empleado"),
    editarEmpleado :    withAxios("put", "/empleado"),
    eliminarEmpleado :  withAxios("delete", "/empleado"),
}

export default apiEmpleado;