import withAxios from '../utilities/provider';
import { axiosQuery, axiosMutator } from '../utilities/core';

const apiMovimiento = {
    new: axiosMutator("post", "/movimiento", "movimiento"),
    edit: axiosMutator("put", "/movimiento", "movimiento"),
    delete: axiosMutator("delete", "/movimiento", "movimiento"),
    get: axiosQuery("get", "/movimiento", "movimiento"),
    getById: axiosQuery("get", "/movimiento", "movimiento-only"),
}

export default apiMovimiento;