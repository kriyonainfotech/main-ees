import { FaStar } from 'react-icons/fa';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios'; // Add axios for API requests
import { toast } from 'react-toastify';

const backend_API = import.meta.env.VITE_API_URL;
const Card = () => {
    const token = JSON.parse(localStorage.getItem('token'));
  
    const { user } = useContext(UserContext);
    // console.log(user, "login user in card");

    // State to manage availability
    const [isAvailable, setIsAvailable] = useState(() => {
        const savedStatus = localStorage.getItem('isAvailable');
        return savedStatus === 'true';
    });

    // Update local storage whenever the state changes
    useEffect(() => {
        localStorage.setItem('isAvailable', isAvailable);
    }, [isAvailable]);

    // Handle checkbox change and update status in backend
    const handleCheckboxChange = async (e) => {
        const newStatus = e.target.checked;

        setIsAvailable(newStatus); // Update availability based on the checkbox

        try {
            const response = await axios.put(`${backend_API}/auth/setUserStatus`, {  userstatus: newStatus ? 'available' : 'unavailable' }, {
                headers: {
                    "Authorization": `Bearer ${token}`, // Assuming JWT token is available in user context
                    "Content-Type": "application/json",
                }
            });
            console.log(response.data);
            toast(`User status updated successfully`)
            
            // Handle success response
            if (response.status === 200) {
                console.log("User status updated successfully:", response.data);
                
            }
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    // Render stars for the rating
    const renderStars = (rating, maxRating = 5) => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`${i <= rating ? "text-warning" : ""}`}
                    style={{ cursor: "pointer" }}
                />
            );
        }
        return stars;
    };

    return (
        <section className='mt-24 p-4'>
            <div className="container">
                <div className="row">
                    <div className="card border-0 card-side bg-base-100 rounded-md shadow-xl w-full p-3 pt-3">
                        <div className="col-12 d-flex flex-wrap">
                            <div className="col-12 col-lg-4 w-full d-flex justify-content-center text-gray-900 py-2">
                                <div>
                                    <figure>
                                        <img
                                            className='rounded-md w-[200px] overflow-hidden'
                                            src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"}
                                            alt="User"
                                        />
                                    </figure>
                                    <div className='text-center'>
                                        <h1 className='text-xl'>{user?.name}</h1>
                                    </div>

                                    <div className="rating rating-sm py-3 w-full text-center d-flex align-items-center">
                                        {renderStars(user?.ratings?.[0]?.rating || 0, 5)}
                                        <span className='btn ms-2 p-0 px-3 bg-green text-white'>
                                            {user?.ratings?.[0]?.rating || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8 text-gray-700">
                                <div className="p-2 shadow-xl mb-1 bg-white d-flex align-items-center text-start">
                                    <div className='col-4 p-2'>
                                        <h6>Email</h6>
                                    </div>
                                    <div className='col-8 p-2 text-gray'>
                                        <p>{user?.email}</p>
                                    </div>
                                </div>
                                <div className="p-2 shadow-xl mb-1 bg-white d-flex align-items-center">
                                    <div className='col-4 p-2'>
                                        <h6>Contact</h6>
                                    </div>
                                    <div className='col-8 p-2 text-gray'>
                                        <p>{user?.phone}</p>
                                    </div>
                                </div>
                                <div className="p-2 shadow-xl mb-1 bg-white d-flex align-items-center">
                                    <div className='col-4 p-2'>
                                        <h6>Address</h6>
                                    </div>
                                    <div className='col-8 p-2 text-gray'>
                                        <p>
                                            {user?.address?.area} {user?.address?.city} {user?.address?.state} {user?.address?.country} {user?.address?.pincode}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-2 shadow-xl mb-1 bg-white d-flex align-items-center">
                                    <div className='col-4 text-sm p-2'>
                                        <h6>Status</h6>
                                    </div>
                                    <div className='col-8 p-2'>
                                        <div className="checkbox-con d-flex align-items-center">
                                            <input
                                                id="checkbox"
                                                type="checkbox"
                                                checked={isAvailable}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className={`ms-2 ${isAvailable ? 'text-success' : 'text-danger'}`}>
                                                {isAvailable ? 'Available' : 'Unavailable'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Card;
