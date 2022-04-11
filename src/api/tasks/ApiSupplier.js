import { axiosQuery, axiosMutator } from '../utilities/core';

const apiSupplier = {
    new: axiosMutator("post", "/supplier", "supplier"),
    edit: axiosMutator("put", "/supplier", "supplier"),
    delete: axiosMutator("delete", "/supplier", "supplier"),
    get: (page, size) => {
        const fnQuery = axiosQuery("get", "/supplier", "supplier");
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery("get", "/supplier", "supplier-only"),
}

export default apiSupplier;