import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiEmployee = {
    new: useAxiosMutator('post', '/employee', 'employee'),
    edit: useAxiosMutator('put', '/employee', 'employee'),
    delete: useAxiosMutator('delete', '/employee', 'employee'),
    get: useAxiosQuery('get', '/employee', 'employee'),
    getById: useAxiosQuery('get', '/employee', 'employee-only'),
};

export default apiEmployee;
