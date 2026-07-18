import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { authContext } from '@/contexts/authContext';
import { AuthService } from '@/services/authService';
import type { User } from '@/types';

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback((newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }, []);

    useEffect(() => {
        if (!token || user) return;

        let cancelled = false;
        AuthService.getProfile()
            .then((response) => {
                if (!cancelled) {
                    setUser(response.data);
                }
            })
            .catch(() => {
                if (!cancelled) logout();
            });

        return () => {
            cancelled = true;
        };
    }, [token, user, logout]);

    const contextValues = useMemo(
        () => ({
            token,
            user,
            isAuthenticated: token !== null,
            login,
            logout,
        }),
        [token, user, login, logout],
    );

    return <authContext.Provider value={contextValues}>{children}</authContext.Provider>;
};

export default AuthProvider;
