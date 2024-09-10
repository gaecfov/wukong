import api from '@/util/api';

export const login = (loginRequest) => {
    return api.post('/login', loginRequest);
};

export const getCurrentUser = () => {
    return api.get('/currentUser');
};
