import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiBrand = {
    new: useAxiosMutator('post', '/brand', 'brand'),
    edit: useAxiosMutator('put', '/brand', 'brand'),
    delete: useAxiosMutator('delete', '/brand', 'brand'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/brand', 'brand');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/brand', 'brand-only'),
    getItemsByBrand: useAxiosQuery('get', '/Product/brand', 'brandItems'),
};

export default apiBrand;
