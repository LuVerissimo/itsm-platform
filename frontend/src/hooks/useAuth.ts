import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';

export const useAuth = () => {
    const { checkAuth } = useUserStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
};
