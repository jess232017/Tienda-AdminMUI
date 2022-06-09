import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiInventory = {
    new: useAxiosMutator('post', '/inventory', 'inventory'),
    edit: useAxiosMutator('put', '/inventory', 'inventory'),
    delete: useAxiosMutator('delete', '/inventory', 'inventory'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/inventory', 'inventory');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/inventory', 'inventory-only'),
};

export default apiInventory;
