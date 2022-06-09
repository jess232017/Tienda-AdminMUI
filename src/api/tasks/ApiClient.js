import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiClient = {
    new: useAxiosMutator('post', '/client', 'client'),
    edit: useAxiosMutator('put', '/users', 'client'),
    delete: useAxiosMutator('delete', '/client', 'client'),
    get: useAxiosQuery('get', '/users', 'cliente'),
    getById: useAxiosQuery('get', '/client', 'client-only'),
};

export default apiClient;
