import { axiosQuery, axiosMutator } from '../utilities/core';

const apiClient = {
    new: axiosMutator("post", "/client", "client"),
    edit: axiosMutator("put", "/users", "client"),
    delete: axiosMutator("delete", "/client", "client"),
    get: axiosQuery("get", "/users", "cliente"),
    getById: axiosQuery("get", "/client", "client-only"),
}

export default apiClient;