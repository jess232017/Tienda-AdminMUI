import { axiosQuery, axiosMutator } from '../utilities/core';

const getUser = (page, size) => {
    const fnQuery = axiosQuery('get', '/User', 'User');
    return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
};
const getUserById = axiosQuery('get', '/User', 'User-only');
const newUser = axiosMutator('post', '/User', 'User');
const editUser = axiosMutator('put', '/User', 'User');
const deleteUser = axiosMutator('delete', '/User', 'User');

const getRole = (page, size) => {
    const fnQuery = axiosQuery('get', '/Role', 'Role');
    return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
};

const apiUser = {
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

export { newUser, editUser, deleteUser, getUser, getUserById, getRole };

export default apiUser;
