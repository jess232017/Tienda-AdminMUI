import { axiosQuery, axiosMutator } from '../utilities/core';

const apiUser = {
    new: axiosMutator("post", "/User", "User"),
    edit: axiosMutator("put", "/User", "User"),
    delete: axiosMutator("delete", "/User", "User"),
    get: (page, size) => {
        const fnQuery = axiosQuery("get", "/User", "User");
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery("get", "/User", "User-only"),
    getItemsByUser: axiosQuery("get", "/Product/User", "UserItems"),
}

export default apiUser;