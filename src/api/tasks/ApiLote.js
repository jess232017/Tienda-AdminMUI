import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiLote = {
    new: useAxiosMutator('post', '/Lote', 'Lote'),
    edit: useAxiosMutator('put', '/Lote', 'Lote'),
    delete: useAxiosMutator('delete', '/Lote', 'Lote'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/Lote', 'Lote');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/Lote', 'Lote-only'),
    getByCategory: (selected, page) => {
        const fnQuery = useAxiosQuery('get', '/Lote', 'category-items');
        return fnQuery(`/${selected}/category?PageNumber=${page}&PageSize=10`);
    },
};

export default apiLote;
