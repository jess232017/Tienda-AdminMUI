import { axiosQuery, axiosMutator } from '../utilities/core';

const apiCategory = {
    new: axiosMutator("post", "/Category", "category"),
    edit: axiosMutator("put", "/Category", "category"),
    delete: axiosMutator("delete", "/Category", "category"),
    get: (page, size) => {
        const fnQuery = axiosQuery("get", "/category", "category");
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery("get", "/Category", "category-only"),
    getItemsByCategory: axiosQuery("get", "/Product/Category", "categoryItems"),
}

export default apiCategory;