import { useContext } from 'react';
import { themeContext } from '@/contexts/themeContext.ts';

export const useTheme = () => {
    const context = useContext(themeContext);

    return { ...context };
};
