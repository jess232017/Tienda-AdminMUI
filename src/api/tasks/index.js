import { axiosQuery, axiosMutator } from '../utilities/core';

export const apiBrand = {
    new: axiosMutator('post', '/brand', 'brand'),
    edit: axiosMutator('put', '/brand', 'brand'),
    delete: axiosMutator('delete', '/brand', 'brand'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/brand', 'brand');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery('get', '/brand', 'brand-only'),
    getItemsByBrand: axiosQuery('get', '/Product/brand', 'brandItems'),
};

export const apiCategory = {
    new: axiosMutator('post', '/Category', 'category'),
    edit: axiosMutator('put', '/Category', 'category'),
    delete: axiosMutator('delete', '/Category', 'category'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/category', 'category');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery('get', '/Category', 'category-only'),
    getItemsByCategory: axiosQuery('get', '/Product/Category', 'categoryItems'),
};

export const apiClient = {
    new: axiosMutator('post', '/client', 'client'),
    edit: axiosMutator('put', '/users', 'client'),
    delete: axiosMutator('delete', '/client', 'client'),
    get: axiosQuery('get', '/users', 'cliente'),
    getById: axiosQuery('get', '/client', 'client-only'),
};

export const apiEmployee = {
    new: axiosMutator('post', '/employee', 'employee'),
    edit: axiosMutator('put', '/employee', 'employee'),
    delete: axiosMutator('delete', '/employee', 'employee'),
    get: axiosQuery('get', '/employee', 'employee'),
    getById: axiosQuery('get', '/employee', 'employee-only'),
};

export const apiIdentity = {
    Authenticate: axiosMutator('post', '/Identity/sign-in'),
    Register: axiosMutator('post', '/Identity/sign-up'),
};

export const apiInventory = {
    new: axiosMutator('post', '/inventory', 'inventory'),
    edit: axiosMutator('put', '/inventory', 'inventory'),
    delete: axiosMutator('delete', '/inventory', 'inventory'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/inventory', 'inventory');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery('get', '/inventory', 'inventory-only'),
};

export const apiLote = {
    new: axiosMutator('post', '/lote', 'lote'),
    edit: axiosMutator('put', '/lote', 'lote'),
    delete: axiosMutator('delete', '/lote', 'lote'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/lote', 'lote');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery('get', '/lote', 'lote-only'),
};

export const apiMovimiento = {
    new: axiosMutator('post', '/movimiento', 'movimiento'),
    edit: axiosMutator('put', '/movimiento', 'movimiento'),
    delete: axiosMutator('delete', '/movimiento', 'movimiento'),
    get: axiosQuery('get', '/movimiento', 'movimiento'),
    getById: axiosQuery('get', '/movimiento', 'movimiento-only'),
};

export const apiOrder = {
    new: axiosMutator('post', '/Order', 'order'),
    addAll: axiosMutator('post', '/Order/new', 'order'),
    edit: axiosMutator('put', '/Order', 'order'),
    editNote: (orderId) => {
        const fnMutator = axiosMutator('put', '/Order', 'order-only');
        return fnMutator(`/${orderId}/note`);
    },
    delete: axiosMutator('delete', '/Order', 'order'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/Order', 'order');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: (orderId) => {
        const fnQuery = axiosQuery('get', '/Order', 'order-only');
        return fnQuery(`/${orderId}`);
    },
    getDetails: (orderId) => {
        const fnQuery = axiosQuery('get', '/OrderItem/order', 'order-items');
        return fnQuery(`/${orderId}`);
    },
};

export const apiProduct = {
    new: axiosMutator('post', '/Product', 'product'),
    edit: axiosMutator('put', '/Product', 'product'),
    delete: axiosMutator('delete', '/product', 'product'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/product', 'product');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery('get', '/product', 'product-only'),
    getByCategory: (selected, page) => {
        const fnQuery = axiosQuery('get', '/product', 'category-items');
        return fnQuery(`/${selected}/category?PageNumber=${page}&PageSize=10`);
    },
};

export const apiSupplier = {
    new: axiosMutator('post', '/supplier', 'supplier'),
    edit: axiosMutator('put', '/supplier', 'supplier'),
    delete: axiosMutator('delete', '/supplier', 'supplier'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/supplier', 'supplier');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery('get', '/supplier', 'supplier-only'),
};

export const apiUser = {
    new: axiosMutator('post', '/User', 'User'),
    edit: axiosMutator('put', '/User', 'User'),
    delete: axiosMutator('delete', '/User', 'User'),
    get: (page, size) => {
        const fnQuery = axiosQuery('get', '/User', 'User');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getRole: (page, size) => {
        const fnQuery = axiosQuery('get', '/Role', 'Role');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: axiosQuery('get', '/User', 'User-only'),
    getItemsByUser: axiosQuery('get', '/Product/User', 'UserItems'),
};
