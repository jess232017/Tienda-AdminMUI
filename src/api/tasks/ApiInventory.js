import { axiosQuery, axiosMutator } from '../utilities/core';

const apiInventory = {
    new: axiosMutator("post", "/inventory", "inventory"),
    edit: axiosMutator("put", "/inventory", "inventory"),
    delete: axiosMutator("delete", "/inventory", "inventory"),
    get: (page, size) => {
        const fnQuery = axiosQuery("get", "/inventory", "inventory");
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery("get", "/inventory", "inventory-only"),
}

export default apiInventory;