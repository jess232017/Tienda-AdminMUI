import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiAccountant = {
    new: useAxiosMutator('post', '/accountant', 'accountant'),
    edit: useAxiosMutator('put', '/accountant', 'accountant'),
    delete: useAxiosMutator('delete', '/accountant', 'accountant'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/accountant', 'accountant');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/accountant', 'accountant-only'),
};

export default apiAccountant;
