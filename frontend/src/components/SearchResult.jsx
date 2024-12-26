import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa6';
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from 'react-toastify';

const backend_API = import.meta.env.VITE_API_URL;

const SearchResult = ({ Usersdata, token }) => {
    const [requestStatus, setRequestStatus] = useState(null); // Stores the status of the request
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
            try {
                const response = await axios.get(`${backend_API}/request/getUserRequests`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.status === 200) {
                    setAllRequest(response.data); // Store all requests 
                    console.log(response.data.sendedRequests, "all requests");

                    const currentRequest = response.data.sendedRequests
                        .find(req => req.user._id === Usersdata?._id);
                    console.log(currentRequest, "current request");

                    setRequestStatus(currentRequest?.status || null); // Set status for this user
                }
            } catch (error) {
                console.error('Error fetching requests:', error.response?.data || error.message);
            }
        };

        fetchRequests();
    }, [Usersdata, token]);

    const sendRequest = async (userId) => {
        if (Usersdata?.userstatus === 'unavailable') {
            // alert("user is uaavailable")
            toast("user is Unvailable")
            return false
            
        }
        try {
            const response = await axios.post(`${backend_API}/request/sentRequest`, { receiverId: userId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setRequestStatus('pending'); // Update status to pending
                toast("Request Sent Successfully!")
            } else {
                alert("Failed to send request!");
            }
        } catch (error) {
            console.error('Error sending request:', error.response?.data || error.message);
        }
    };

    return (
        <div className="col-12 col-md-6 col-xl-3 p-2" style={{ cursor: "pointer" }}>
            <div className="card border-0 bg-base-100 shadow-xl">
                <div className="d-flex justify-content-between">
                    <figure className="rounded-md m-3">
                        <img
                            src={
                                Usersdata?.profilePic ||
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
                            }
                            alt="User Profile"
                        />
                    </figure>
                    <span
                        className={`h-[20px] px-2 py-3 shadow-xl bg-white d-flex align-items-center rounded-5 text-capitalize text-sm p ${Usersdata?.userstatus === 'available' ? 'text-green' : 'text-orange'}`}
                    >
                        {Usersdata?.userstatus}
                    </span>
                </div>
                <div className="p-3">
                    <h2 className="font-bold">{Usersdata?.name}</h2>
                    <h5 className="font-bold">{Usersdata?.businessCategory}</h5>
                    <h6 className="font-bold">{Usersdata?.address?.city}</h6>
                    <p className="text-sm text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, laborum.
                    </p>
                    <div className="rating rating-sm py-4 d-flex align-items-center">
                        {
                            Usersdata.ratings ? (
                                <div className='d-flex align-items-center'>
                                    {renderStars(Usersdata?.ratings.map((r) => r.rating)[0], 5)}
                                    <span className="ps-2 ">{Usersdata.ratings.map((r) => r.rating)[0]}</span>
                                </div>
                            ) : (<></>)
                        }
                    </div>

                    <div>
                        {requestStatus === 'pending' ? (
                            <button
                                className="btn btn-danger"
                                
                            >
                               cancle
                            </button>
                        ) : (
                           
                                <button
                                    className='btn bg-green text-white'
                                    onClick={() => sendRequest(Usersdata?._id)}
                                >
                                    Send Request
                                </button>
                            
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
