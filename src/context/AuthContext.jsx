
import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const authInfo = {
        user: null,
        loading: false
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
