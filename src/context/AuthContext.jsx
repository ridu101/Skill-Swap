
import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const facebookProvider = new FacebookAuthProvider();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            },
            () => {
                setUser(null);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    async function signup(name, email, password, photoURL = "") {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(result.user, {
            displayName: name,
            ...(photoURL.trim() ? { photoURL: photoURL.trim() } : {}),
        });

        setUser(auth.currentUser);
        return result.user;
    }

    async function login(email, password) {
        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return result.user;
    }

    async function googleLogin() {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    }

    async function facebookLogin() {
        const result = await signInWithPopup(auth, facebookProvider);
        return result.user;
    }

    async function logout() {
        await signOut(auth);
    }

    async function resetPassword(email) {
        await sendPasswordResetEmail(auth, email);
    }

    const authInfo = {
        user,
        loading,
        signup,
        login,
        googleLogin,
        facebookLogin,
        logout,
        resetPassword,
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