import { axiosQuery, axiosMutator } from '../utilities/core';

const apiOrder = {
    new: axiosMutator("post", "/Order", "order"),
    addAll: axiosMutator("post", "/Order/new", "order"),
    edit: axiosMutator("put", "/Order", "order"),
    editNote: (orderId) => {
        const fnMutator = axiosMutator("put", "/Order", "order-only");
        return fnMutator(`/${orderId}/note`);
    },
    delete: axiosMutator("delete", "/Order", "order"),
    get: (page, size) => {
        const fnQuery = axiosQuery("get", "/Order", "order");
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: (orderId) => {
        const fnQuery = axiosQuery("get", "/Order", "order-only");
        return fnQuery(`/${orderId}`);
    },
    getDetails: (orderId) => {
        const fnQuery = axiosQuery("get", "/OrderItem/order", "order-items");
        return fnQuery(`/${orderId}`);
    },
}

export default apiOrder;