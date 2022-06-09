import withAxios from '../utilities/provider';
import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiMovimiento = {
    new: useAxiosMutator('post', '/movimiento', 'movimiento'),
    edit: useAxiosMutator('put', '/movimiento', 'movimiento'),
    delete: useAxiosMutator('delete', '/movimiento', 'movimiento'),
    get: useAxiosQuery('get', '/movimiento', 'movimiento'),
    getById: useAxiosQuery('get', '/movimiento', 'movimiento-only'),
};

export default apiMovimiento;
