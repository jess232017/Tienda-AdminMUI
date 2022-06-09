import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiCategory = {
    new: useAxiosMutator('post', '/Category', 'category'),
    edit: useAxiosMutator('put', '/Category', 'category'),
    delete: useAxiosMutator('delete', '/Category', 'category'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/category', 'category');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/Category', 'category-only'),
    getItemsByCategory: useAxiosQuery('get', '/Product/Category', 'categoryItems'),
};

export default apiCategory;
