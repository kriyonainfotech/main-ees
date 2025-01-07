import axios from 'axios';
import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const backend_API = import.meta.env.VITE_API_URL;

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backend_API}/auth/logout`, {
        withCredentials: true, // Required for cookies
      });

      if (response.status === 200) {  
        toast("Logout Successful...");
        // Clear client-side storage
        localStorage.removeItem('token');
        localStorage.removeItem('Users');
        // Redirect to login
        navigate('/login');
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <li className="p-2 rounded hover:bg-primary hover:text-white focus:text-white">
      <Link
        onClick={handleLogout}
        className="w-100 text-md d-flex justify-content-start justify-content-lg-start align-items-center"
      >
        <span className="inline-block mr-3 text-lg">
          <FaPowerOff />
        </span>
        Logout
      </Link>
    </li>
  );
};

export default Logout;
