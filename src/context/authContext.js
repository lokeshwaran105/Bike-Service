// This component provides authentication state management using React context.


// Imports
import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {

    // State for authentication details
    const [authState, setAuthState] = useState(() => {
        const savedAuthState = localStorage.getItem('authState');
        return savedAuthState
            ? JSON.parse(savedAuthState) : {
                  isAuthenticated: false,
                  ownerId: "",
                  ownerName: "",
                  role: ""
            };
    });

    // Effect to check token on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Update auth state
            setAuthState(prevState => ({
                ...prevState,
                isAuthenticated: true,
            }));
        }
    }, []);

    // Function to handle login
    const login = (ownerId, ownerName, role) => {
        const newAuthState = {
            isAuthenticated: true,
            ownerId: ownerId,
            ownerName: ownerName,
            role: role
        };
        localStorage.setItem('authState', JSON.stringify(newAuthState));
        setAuthState(newAuthState);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authState');
        setAuthState({
            isAuthenticated: false,
            ownerId: "",
            ownerName: "",
            role: ""
        });
    };

    // JSX return
    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
