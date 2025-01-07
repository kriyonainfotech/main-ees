import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../admincomponents/AdminHeader';
import AdminSidebar from '../admincomponents/AdminSidebar';

const backend_API = import.meta.env.VITE_API_URL;

const AllUsers = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backend_API}/auth/getAllUser`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.data;
      setUserList(data.user);
      console.log(data, "AllUser");
      if (response.status === 200) {
        console.log("All User Successful...");
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timed out');
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DeletUser = async (uid) => {
    console.log(uid);
    try {
      const response = await axios.delete(`${backend_API}/auth/deleteUser`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { id: uid },
      });
      console.log(response.data, "delete data");
      if (response.status === 200) {
        alert("User deleted successfully");
        console.log("User deleted successfully");
        fetchData(); // Refresh the user list after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <section className='mt-32'>
        <div className="container-fluid">
          <div className='card bg-base-100 shadow-xl mt-5'>
            <div className="card-header text-xl text-bold z-30 py-3">All Users</div>
            <div className="overflow-x-auto">
              <table className="table table-bordered flex z-0 border p-5">
                {/* Table Header */}
                <thead className='text-bold text-[15px] text-black z-30'>
                  <tr>
                    <th>SrNo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Business Name</th>
                    <th>Business Category</th>
                    <th>Business Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {
                    [...userList].reverse().map((user, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          {user?.address?.area} {user?.address?.city} {user?.address?.state} 
                          {user?.address?.country} {user?.address?.pincode}
                        </td>
                        <td>{user.businessName}</td>
                        <td>{user.businessCategory}</td>
                        <td>{user.businessAddress}</td>
                        <td className='d-flex'>
                          <button
                            onClick={() => DeletUser(user._id)}
                            className='btn-xl m-1 fs-3 text-primary'>
                            <MdOutlineDeleteOutline />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/editUser`, { state: user })}
                            className='btn-xl fs-4 text-green-500'>
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllUsers;
