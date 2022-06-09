import { useAxiosQuery, useAxiosMutator } from '../utilities/core';

const getUser = (page, size) => {
    const fnQuery = useAxiosQuery('get', '/User', 'User');
    return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
};
const getUserById = useAxiosQuery('get', '/User', 'User-only');
const newUser = useAxiosMutator('post', '/User', 'User');
const editUser = useAxiosMutator('put', '/User', 'User');
const deleteUser = useAxiosMutator('delete', '/User', 'User');

const getRole = (page, size) => {
    const fnQuery = useAxiosQuery('get', '/Role', 'Role');
    return fnQuery(`?PageNumber=${page}&PageSize=${size}`);
};

const apiUser = {
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

export { newUser, editUser, deleteUser, getUser, getUserById, getRole };

export default apiUser;
