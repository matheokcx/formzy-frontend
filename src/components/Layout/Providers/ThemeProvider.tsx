import { type ReactNode, useEffect, useState } from 'react';
import { themeContext } from '@/contexts/themeContext.ts';

type ThemeProviderProps = {
    children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') ?? 'light');

    const handleTheme = (): void => {
        const newThemeValue = theme === 'light' ? 'dark' : 'light';
        setTheme(newThemeValue);
        localStorage.setItem('theme', newThemeValue);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <themeContext.Provider value={{ theme: theme, handleThemeChange: handleTheme }}>
            {children}
        </themeContext.Provider>
    );
};

export default ThemeProvider;
