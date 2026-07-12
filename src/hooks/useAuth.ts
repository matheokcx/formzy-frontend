import { useContext } from 'react';
import { authContext, type AuthContextProps } from '@/contexts/authContext.ts';

export const useAuth = (): AuthContextProps => useContext(authContext);
