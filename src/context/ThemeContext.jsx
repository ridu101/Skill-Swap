
import { createContext, useContext } from "react";

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => { },
});

export function ThemeProvider({ children }) {
    return (
        <ThemeContext.Provider
            value={{ theme: "light", toggleTheme: () => { } }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    return useContext(ThemeContext);
}
