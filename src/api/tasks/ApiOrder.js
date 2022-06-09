import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const apiOrder = {
    new: useAxiosMutator('post', '/Order', 'order'),
    addAll: useAxiosMutator('post', '/Order/new', 'order'),
    edit: useAxiosMutator('put', '/Order', 'order'),
    editNote: (orderId) => {
        const fnMutator = useAxiosMutator('put', '/Order', 'order-only');
        return fnMutator(`/${orderId}/note`);
    },
    delete: useAxiosMutator('delete', '/Order', 'order'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/Order', 'order');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: (orderId) => {
        const fnQuery = useAxiosQuery('get', '/Order', 'order-only');
        return fnQuery(`/${orderId}`);
    },
    getDetails: (orderId) => {
        const fnQuery = useAxiosQuery('get', '/OrderItem/order', 'order-items');
        return fnQuery(`/${orderId}`);
    },
};

export default apiOrder;
