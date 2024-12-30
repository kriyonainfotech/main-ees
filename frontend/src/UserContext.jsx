import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const backend_API = import.meta.env.VITE_API_URL;

// Utility function to get a cookie value by name
const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
};

// Utility function to decode JWT
const decodeToken = (token) => {
    try {
        const payload = token.split(".")[1]; // The payload is the second part of the JWT
        return JSON.parse(atob(payload)); // Decode base64 and parse to JSON
    } catch (error) {
        console.error("Invalid token format:", error);
        return null;
    }
};
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
                            // Get refreshToken from cookies
                            const token = getCookie("refreshToken");
                            console.log("Token from cookie:", token);
            
                            // if (!token) {
                            //     console.error("No refreshToken found in cookies. Redirecting to login...");
                            //     window.location.href = "/login";
                            //     return;
                            // }
            
                            // Decode the token to check validity
                            const decodedToken = decodeToken(token);
                            console.log("Decoded token:", decodedToken);
            
            
            
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
