import api from '@/util/api';

export const listUsers = () => {
    return api.get('/user');
};

export const createUser = (user) => {
    return api.post('/user', user);
};

export const modifyUser = (id, user) => {
    return api.put(`/user/${id}`, user);
};

export const deleteUser = (id) => {
    return api.delete(`/user/${id}`);
};

export const changePassword = (id, password) => {
    return api.put(`/user/${id}/password`, password);
};
