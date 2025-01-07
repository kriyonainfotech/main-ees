import { FaStar } from 'react-icons/fa';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios'; // Add axios for API requests
import { toast } from 'react-toastify';
import GetUserRating from './GetUserRating';

const backend_API = import.meta.env.VITE_API_URL;

const Card = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const { user } = useContext(UserContext);

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
        setIsAvailable(newStatus);

        try {
            const response = await axios.put(
                `${backend_API}/auth/setUserStatus`,
                { userstatus: newStatus ? 'available' : 'unavailable' },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                toast.success('User status updated successfully');
            }
        } catch (error) {
            toast.error('Error updating user status');
            console.error('Error updating user status:', error);
        }
    };

    // Render stars for the rating
    const renderStars = (rating, maxRating = 10) => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={` ${i <= rating ? "text-warning" : "text-muted"}`}
                    style={{ cursor: "pointer" }}
                />
            );
        }
        return stars;
    };

    // Handle user rating display
    const userRating = user?.ratings?.length
        ? user?.ratings.reduce((acc, curr) => acc + curr.rating, 0) / user?.ratings.length
        : 0; // Average rating if available, otherwise default to 0.

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="p-4 border-0 shadow-xl">
                        <div className="col-12 d-flex">
                            {/* Profile Picture Section */}
                            <div className="col-5 col-md-4">
                                <div className="w-100 text-center ">
                                    <div className='d-flex justify-content-center'>
                                        <div className="img-card w-[250px] h-[200px] d-flex overflow-hidden justify-content-center">
                                            <img
                                                className="rounded-md img-fluid w-100 overflow-hidden"
                                                src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"}
                                                alt="User"

                                            />
                                        </div>
                                    </div>
                                    <div className="pt-3 w-100">
                                        <h1 className="fs-3">{user?.name}</h1>
                                        <div className="rats d-none d-md-none  d-flex flex-column justify-content-center">
                                            <h2 className="text-sm  font-bold">User Rating</h2>
                                            <div className='md:ms-20 text-center'>
                                                <GetUserRating />
                                            </div>
                                            <div className="rating d-flex  flex-col rating-sm py-2 ">
                                                <h2 className=" text-sm font-bold ">Provider Rating</h2>
                                                <div className='d-flex text-center justify-content-center'>
                                                    {renderStars(userRating, 10)}
                                                    <span className=' ms-2 p-0 '>({userRating.toFixed(1)})</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Details Section */}
                            <div className="col-7 col-md-8 text-gray-700">
                                <div className="px-2 d-none d-md-none">
                                    <h1 className="fs-3">{user?.name}</h1>
                                </div>

                                {/* Email */}
                                <div className="p-2 d-flex">
                                    <div className="d-none d-md-flex col-4 col-md-2">
                                        <h6>Email</h6>
                                    </div>
                                    <div className="col-12 col-md-10 ps-3 text-gray">
                                        <p>{user?.email}</p>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="p-2 d-flex">
                                    <div className="d-none d-md-flex col-4 col-md-2">
                                        <h6>Contact</h6>
                                    </div>
                                    <div className="col-12 col-md-10 ps-3 text-gray">
                                        <p>{user?.phone}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="p-2 d-flex">
                                    <div className="d-none d-md-flex col-4 col-md-2">
                                        <h6>Address</h6>
                                    </div>
                                    <div className="col-12 col-md-10 ps-3 text-gray">
                                        <p>{user?.address?.area} {user?.address?.city} {user?.address?.state} {user?.address?.country} {user?.address?.pincode}</p>
                                    </div>
                                </div>

                                {/* Availability Status */}
                                <div className="p-2 d-flex">
                                    <div className="d-none d-md-flex col-4 col-md-2 text-sm">
                                        <h6>Status</h6>
                                    </div>
                                    <div className="col-12 col-md-10 ps-3">
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

                                {/* Ratings */}
                                <div className="p-2 d-flex d-md-flex">
                                    <div className="d-none d-md-flex col-4 col-md-2 text-sm">
                                        <h6>Ratings</h6>
                                    </div>
                                    <div className="col-12 col-md-10 ps-3">
                                        <div className='d-flex align-items-center text gap-2'>
                                        <span className='d-none d-md-flex'>User</span>
                                        <GetUserRating />
                                        </div>
                                        <div className="rating d-flex text  flex-col rating-sm py-2 ">
                                              
                                                <div className='d-flex text text-center align-items-center'>
                                                <span className=" pe-2 d-none d-md-flex">Provider</span>
                                                    {renderStars(userRating, 10)}
                                                    <span className=' ms-2 p-0 d-none d-md-flex'>({userRating.toFixed(1)})</span>
                                                </div>
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
