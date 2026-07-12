import { createContext } from 'react';

type ThemeContextProps = {
    theme: string;
    handleThemeChange: () => void;
};

export const themeContext = createContext<ThemeContextProps>({
    theme: 'light',
    handleThemeChange: () => {},
});
