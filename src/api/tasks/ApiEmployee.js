import { axiosQuery, axiosMutator } from '../utilities/core';

const apiEmployee = {
    new: axiosMutator("post", "/employee", "employee"),
    edit: axiosMutator("put", "/employee", "employee"),
    delete: axiosMutator("delete", "/employee", "employee"),
    get: axiosQuery("get", "/employee", "employee"),
    getById: axiosQuery("get", "/employee", "employee-only"),
}

export default apiEmployee;