import { axiosQuery, axiosMutator } from '../utilities/core';

const apiAccountant = {
    new: axiosMutator('post', '/accountant', 'accountant'),
    edit: axiosMutator('put', '/accountant', 'accountant'),
    delete: axiosMutator('delete', '/accountant', 'accountant'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/accountant', 'accountant');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery('get', '/accountant', 'accountant-only'),
};

export default apiAccountant;
