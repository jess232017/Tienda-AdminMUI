import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiProduct = {
    new: useAxiosMutator('post', '/Product', 'product'),
    edit: useAxiosMutator('put', '/Product', 'product'),
    delete: useAxiosMutator('delete', '/product', 'product'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/product', 'product');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/product', 'product-only'),
    getByCategory: (selected, page) => {
        const fnQuery = useAxiosQuery('get', '/product', 'category-items');
        return fnQuery(`/${selected}/category?PageNumber=${page}&PageSize=10`);
    },
};

export default apiProduct;
