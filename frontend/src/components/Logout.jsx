import axios from 'axios';
import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const backend_API = import.meta.env.VITE_API_URL;

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backend_API}/auth/logout`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Logout Successful...");
        
        // Clear cookies and localStorage
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('token');
        localStorage.removeItem('Users');
        
        navigate('/login'); // Redirect to login
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <li className="p-2 rounded hover:bg-primary hover:text-white focus:text-white">
      <Link onClick={handleLogout} className="w-100 text-lg d-flex justify-content-center justify-content-lg-start align-items-center">
        <span className="inline-block mr-2 text-xl">
          <FaPowerOff />
        </span>
        Logout
      </Link>
    </li>
  );
};

export default Logout;
