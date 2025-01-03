import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa6';
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from 'react-toastify';
import { FCMContext } from '../context/FCMContext';

const backend_API = import.meta.env.VITE_API_URL;

const SearchResult = ({ Usersdata, token }) => {
    const { fcmToken } = useContext(FCMContext);

    const [requestStatus, setRequestStatus] = useState(null); // Stores the status of the request
    const [loading, setLoading] = useState(false); // Loading state for request actions
    const [allRequest, setAllRequest] = useState([]); // Store all requests' data

    // Render stars for the rating
    const renderStars = (rating, maxRating = 5) => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={` ${i <= rating ? "text-warning" : ""}`}
                    style={{ cursor: "pointer" }}
                />
            );
        }
        return stars;
    };

    // Fetch request data and user info on component mount
    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${backend_API}/request/getUserRequests`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.status === 200) {
                    setAllRequest(response.data); // Store all requests 
                    const currentRequest = response.data.sendedRequests.find(req => req.user._id === Usersdata?._id);
                    setRequestStatus(currentRequest?.status || null); // Set status for this user
                }
            } catch (error) {
                console.error('Error fetching requests:', error.response?.data || error.message);
                toast.error("Failed to load requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [Usersdata, token]);

    const sendRequest = async (userId) => {
        if (Usersdata?.userstatus === 'unavailable') {
            toast("User is unavailable");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${backend_API}/request/sentRequest`, { receiverId: userId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setRequestStatus('pending'); // Update status to pending
                toast("Request Sent Successfully!");

                // Send FCM Notification
                const notificationResponse = await axios.post(`${backend_API}/auth/send`, {
                    fcmToken: Usersdata?.fcmToken,
                    senderName: Usersdata?.name,
                    title: "New Request Received",
                    message: `${Usersdata?.name} has sent you a request.`,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (notificationResponse.status === 200) {
                    console.log("FCM notification sent successfully!");
                } else {
                    console.warn("Failed to send FCM notification.");
                }
            } else {
                toast.error("Failed to send request.");
            }
        } catch (error) {
            console.error('Error sending request:', error.response?.data || error.message);
            toast.error("Failed to send request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col-12 col-md-6 col-xl-3 p-2" style={{ cursor: "pointer" }}>
            <div className=" border-0 overfloe-hidden  shadow-xl">
                <div className="d-flex justify-content-between">
                    <figure className="rounded-md h-[100px] w-[100px] overflow-hidden  m-3">
                        <img
                            src={Usersdata?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"}
                            alt="User Profile"
                            className='img-fluid overflow-hidden'
                            style={{objectFit:"cover",objectPosition:"center"}}
                        />
                    </figure>
                    <span
                        className={`h-[20px] px-2 py-3 shadow-xl bg-white d-flex align-items-center rounded-5 text-capitalize text-sm p ${Usersdata?.userstatus === 'available' ? 'text-green' : 'text-orange'}`}
                    >
                        {Usersdata?.userstatus}
                    </span>
                </div>
                <div className="p-3 text-capitalize">
                    <h2 className="font-bold">{Usersdata?.name}</h2>
                    <h5 className="font-semibold py-1">{Usersdata?.businessCategory}</h5>
                    <p className="text-muted text">{Usersdata?.address?.area} {Usersdata?.address?.city} {Usersdata?.address?.state} {Usersdata?.address?.country} {Usersdata?.address?.pincode}</p>
                    <div className="rating rating-sm py-2 d-flex align-items-center">
                        {Usersdata.ratings && (
                            <div className="d-flex align-items-center">
                                {renderStars(Usersdata?.ratings[0]?.rating, 5)}
                                <span className="ps-2 ">{Usersdata.ratings[0]?.rating}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        {requestStatus === 'pending' ? (
                            <button className="btn bg-orange text-white" onClick={() => sendRequest(Usersdata?._id)}>
                                Cancel Request
                            </button>
                        ) : (
                            <button
                                className='btn bg-green text-white'
                                onClick={() => sendRequest(Usersdata?._id)}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Request'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
