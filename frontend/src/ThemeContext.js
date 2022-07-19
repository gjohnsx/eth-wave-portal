import React, { useState, useContext, createContext } from 'react';

// const ThemeContext = React.createContext();
const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
};

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
};

export function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(true);

    const toggleDarkTheme = () => {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    };

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleDarkTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
};