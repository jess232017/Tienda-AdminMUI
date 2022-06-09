import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

export const apiBrand = {
    new: useAxiosMutator('post', '/brand', 'brand'),
    edit: useAxiosMutator('put', '/brand', 'brand'),
    delete: useAxiosMutator('delete', '/brand', 'brand'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/brand', 'brand');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/brand', 'brand-only'),
    getItemsByBrand: useAxiosQuery('get', '/Product/brand', 'brandItems'),
};

export const apiCategory = {
    new: useAxiosMutator('post', '/Category', 'category'),
    edit: useAxiosMutator('put', '/Category', 'category'),
    delete: useAxiosMutator('delete', '/Category', 'category'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/category', 'category');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/Category', 'category-only'),
    getItemsByCategory: useAxiosQuery('get', '/Product/Category', 'categoryItems'),
};

export const apiUser = {
    new: useAxiosMutator('post', '/User', 'User'),
    edit: useAxiosMutator('put', '/User', 'User'),
    delete: useAxiosMutator('delete', '/User', 'User'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/User', 'User');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getRole: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/Role', 'Role');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/User', 'User-only'),
    getItemsByUser: useAxiosQuery('get', '/Product/User', 'UserItems'),
};

export const apiEmployee = {
    new: useAxiosMutator('post', '/Employee', 'Employee'),
    edit: useAxiosMutator('put', '/Employee', 'Employee'),
    delete: useAxiosMutator('delete', '/Employee', 'Employee'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/Employee', 'Employee');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getRole: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/Role', 'Role');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/Employee', 'Employee-only'),
};

export const apiIdentity = {
    Authenticate: useAxiosMutator('post', '/Identity/sign-in'),
    Register: useAxiosMutator('post', '/Identity/sign-up'),
};

export const apiInventory = {
    new: useAxiosMutator('post', '/inventory', 'inventory'),
    edit: useAxiosMutator('put', '/inventory', 'inventory'),
    delete: useAxiosMutator('delete', '/inventory', 'inventory'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/inventory', 'inventory');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/inventory', 'inventory-only'),
};

export const apiLote = {
    new: useAxiosMutator('post', '/lote', 'lote'),
    edit: useAxiosMutator('put', '/lote', 'lote'),
    delete: useAxiosMutator('delete', '/lote', 'lote'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/lote', 'lote');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/lote', 'lote-only'),
};

export const apiMovimiento = {
    new: useAxiosMutator('post', '/movimiento', 'movimiento'),
    edit: useAxiosMutator('put', '/movimiento', 'movimiento'),
    delete: useAxiosMutator('delete', '/movimiento', 'movimiento'),
    get: useAxiosQuery('get', '/movimiento', 'movimiento'),
    getById: useAxiosQuery('get', '/movimiento', 'movimiento-only'),
};

export const apiOrder = {
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/order', 'order');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: (orderId) => {
        const fnQuery = useAxiosQuery('get', '/order', 'order-only');
        return fnQuery(`/${orderId}`);
    },
    getDetails: (orderId) => {
        const fnQuery = useAxiosQuery('get', `/order/${orderId}/details`, 'order-items');
        return fnQuery(`/${orderId}`);
    },
    new: useAxiosMutator('post', '/order', 'order'),
    edit: useAxiosMutator('put', '/order', 'order'),
    editNote: (orderId) => {
        const fnMutator = useAxiosMutator('put', '/order', 'order-only');
        return fnMutator(`/${orderId}/note`);
    },
    delete: useAxiosMutator('delete', '/order', 'order'),
};

export const apiProduct = {
    new: useAxiosMutator('post', '/Product', 'product'),
    edit: useAxiosMutator('put', '/Product', 'product'),
    delete: useAxiosMutator('delete', '/product', 'product'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/product', 'product');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/product', 'product-only'),
    getByCategory: (selected, page) => {
        const fnQuery = useAxiosQuery('get', '/product', 'category-items');
        return fnQuery(`/${selected}/category?PageNumber=${page}&PageSize=10`);
    },
};

export const apiSupplier = {
    new: useAxiosMutator('post', '/supplier', 'supplier'),
    edit: useAxiosMutator('put', '/supplier', 'supplier'),
    delete: useAxiosMutator('delete', '/supplier', 'supplier'),
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/supplier', 'supplier');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    getById: useAxiosQuery('get', '/supplier', 'supplier-only'),
};

export const apiPaymentMethod = {
    get: (page, size) => {
        const fnQuery = useAxiosQuery('get', '/paymentMethod', 'paymentMethod');
        return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
    },
    new: useAxiosMutator('post', '/paymentMethod', 'paymentMethod'),
    edit: useAxiosMutator('put', '/paymentMethod', 'paymentMethod'),
    delete: useAxiosMutator('delete', '/paymentMethod', 'paymentMethod'),
};
