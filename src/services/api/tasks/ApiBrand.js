import { axiosQuery, axiosMutator } from '../utilities/core';

const apiBrand = {
    new: axiosMutator("post", "/brand", "brand"),
    edit: axiosMutator("put", "/brand", "brand"),
    delete: axiosMutator("delete", "/brand", "brand"),
    get: (page, size) => {
        const fnQuery = axiosQuery("get", "/brand", "brand");
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery("get", "/brand", "brand-only"),
    getItemsByBrand: axiosQuery("get", "/Product/brand", "brandItems"),
}

export default apiBrand;