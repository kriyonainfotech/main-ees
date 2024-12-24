import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const backend_API = import.meta.env.VITE_API_URL;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${backend_API}/auth/getuser`, {
                    withCredentials: true, // Include cookies in the request
                });
                setUser(response.data.user);
                console.log("Fetched user data:", response.data.user);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
                if (error.response && error.response.status === 403) {
                    console.error("Invalid or expired token. Redirecting to login...");
                    window.location.href = "/login"; // Redirect to login page
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
