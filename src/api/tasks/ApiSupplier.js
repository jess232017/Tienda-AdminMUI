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
    getByCategory: (selected, page) => {
        const fnQuery = useAxiosQuery('get', '/supplier', 'category-items');
        return fnQuery(`/${selected}/category?PageNumber=${page}&PageSize=10`);
    },
};

export default apiSupplier;
