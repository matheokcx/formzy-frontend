import { useContext } from 'react';
import { themeContext } from '@/contexts/themeContext.ts';

export const useTheme = () => {
    return useContext(themeContext);
};
