import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiSupplier = {
    new: useAxiosMutator('post', '/supplier', 'supplier'),
    edit: useAxiosMutator('put', '/supplier', 'supplier'),
    delete: useAxiosMutator('delete', '/supplier', 'supplier'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/supplier', 'supplier');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/supplier', 'supplier-only'),
};

export default apiSupplier;
