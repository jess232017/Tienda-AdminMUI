import { axiosQuery, axiosMutator } from '../utilities/core';

const apiProduct = {
    new: axiosMutator("post", "/Product", "product"),
    edit: axiosMutator("put", "/Product", "product"),
    delete: axiosMutator("delete", "/product", "product"),
    get: (page, size) => {
        const fnQuery = axiosQuery("get", "/product", "product");
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery("get", "/product", "product-only"),
    getByCategory: (selected, page) => {
        const fnQuery = axiosQuery("get", "/product", "category-items");
        return fnQuery(`/${selected}/category?PageNumber=${page}&PageSize=10`);
    },
}

export default apiProduct;