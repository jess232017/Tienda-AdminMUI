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
    getByCategory: (selected, page) => {
        const fnQuery = useAxiosQuery('get', '/inventory', 'category-items');
        return fnQuery(`/${selected}/category?PageNumber=${page}&PageSize=10`);
    },
};

export default apiInventory;
