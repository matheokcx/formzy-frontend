import { createContext } from 'react';
import type { User } from '@/types';

export interface AuthContextProps {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const authContext = createContext<AuthContextProps>({
    token: null,
    user: null,
    isAuthenticated: false,
    login: () => undefined,
    logout: () => undefined,
});
