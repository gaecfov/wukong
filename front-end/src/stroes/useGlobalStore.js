import * as aus from '@/service/AuthService';
import router from '@/router';

export const useGlobalStore = defineStore('global-store', () => {
    const token = useStorage('token', null);
    const currentUser = useStorage('currentUser', {});

    const isLogin = computed(() => {
        return token.value !== undefined && token.value != null;
    });

    const signIn = (loginRequest) => {
        token.value = null;
        aus.login(loginRequest).then((res) => {
            if (res.data) {
                token.value = res.data;
                getCurrentUser();
            }
        });
    };

    const getCurrentUser = () => {
        aus.getCurrentUser().then((res) => {
            currentUser.value = res.data;
            router.push('/');
        });
    };

    return { currentUser, token, isLogin, signIn };
});
