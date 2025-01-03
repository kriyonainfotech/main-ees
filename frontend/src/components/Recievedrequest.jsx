import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaLocationDot, FaPhone, FaStar } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import acService from '../../public/service-icons/ac service.png';
import { toast } from 'react-toastify';
import { LuUserPen } from 'react-icons/lu';
import Rating from './Rating';

const backend_API = import.meta.env.VITE_API_URL;

const Recievedrequest = ({ recievedRequest, isReceiverAvailable, setIsReceiverAvailable }) => {
    const [status, setStatus] = useState('');
    const [serviceProviderId, setServiceProviderId] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));
    const naviget = useNavigate();
    const [providerRating, setProviderRating] = useState(() => {
        const savedRating = localStorage.getItem("providerRating");
        return savedRating ? JSON.parse(savedRating) : 0;
    });

    const handleProviderRatingClick = (rating) => {
        setProviderRating(rating);
        localStorage.setItem("providerRating", JSON.stringify(rating));
    };

    const renderStars = (ratings, maxRating = 5) => {
        const ratingValue = ratings.length > 0 ? ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length : 0;
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <FaStar key={i} className={` ${i <= ratingValue ? "text-warning" : ""}`} style={{ cursor: "pointer" }} />
            );
        }
        return stars;
    };

    const handleAcceptRequest = async (senderId) => {
        try {
            const response = await axios.post(`${backend_API}/request/receivedRequest`, { senderId: senderId }, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            });

            if (response.status === 200) {
                setStatus("received");
                toast.success(`Request accepted successfully`);
            } else {
                console.error("Failed to accept request:", response.data.message);
                toast.error("Failed to accept request.");
            }
        } catch (error) {
            console.error("Error accepting user request:", error);
            toast.error("An error occurred while accepting the request.");
        }
    };

    const cancelRequest = async (senderId) => {
        try {
            const response = await axios.post(`${backend_API}/request/cancelRequest`, { senderId: senderId }, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            });

            if (response.status === 200) {
                setStatus("canceled");
                toast.success("Request canceled successfully.");
            } else {
                console.error("Failed to cancel request:", response.data.message);
                toast.error("Failed to cancel request.");
            }
        } catch (error) {
            console.error("Error canceling user request:", error);
            toast.error("An error occurred while canceling the request.");
        }
    };

    useEffect(() => {
        let receive = [...recievedRequest];
        receive.forEach((req) => {
            if (req.status === 'received') {
                setStatus('received');
            } else if (req.status === 'canceled') {
                setStatus('canceled');
            } else if (req.status === 'pending') {
                setStatus('pending');
            }
        });
    }, [recievedRequest]);

    const handleWorkDone = async(senderId) => {
        // toast.success(`Work done by ${id}`);
        try {
            const response = await axios.post(`${backend_API}/request/workDone`, { senderId: senderId }, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            });

            if (response.status === 200) {
                setStatus("pending");
                toast.success(`Work done successfully`);
            } else {
                console.error("Failed to work done request:", response.data.message);
                toast.error("Failed to work done request.");
            }
        } catch (error) {
            console.error("Error work done  user request:", error);
            toast.error("An error occurred while work done  request.");
        }
        setServiceProviderId(senderId);

    };
    // console.log(recievedRequest,"recieved");
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-12 pt-3">
                                <h4>Received Request</h4>
                            </div>
                    <div className="col-12 flex flex-wrap py-2 ">
                        {recievedRequest.map((receive, i) => (
                            <div key={i} className="col-12 col-md-6 w-full col-lg-4 p-1">
                                <div className="bg-white border-black rounded-md overflow-hidden d-flex shadow flex-md-column" style={{ position: "relative" }}>
                                    <div className='col-5 col-md-12 d-flex'>
                                        <div className="img p-2" style={{ height: "300px", width: "100%" }}>
                                            <img className='img-fluid rounded' src={receive?.user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"} alt="User" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                                        </div>
                                        <span className={`position-absolute rounded-full top-5 end-5 p-1 text-sm text-white px-2 ${receive?.user?.userstatus === "available" ? "bg-green" : "bg-orange"}`}>{receive?.user?.userstatus}</span>
                                    </div>
                                    <div className="p-3 pt-0 col-7 col-md-12 d-flex align-items-center">
                                        <div className='w-full'>
                                            <div className='d-flex flex-column flex-md-row justify-content-start justify-content-md-between'>
                                                <div className="rating  rating-sm py-3 w-full text-center d-flex align-items-center">
                                                    {renderStars(receive?.user?.ratings || [], 5)}
                                                    <span className=' ms-2 p-0 px-3 '>{receive?.user?.ratings?.length ? receive?.user?.ratings[0].rating : 0}</span>
                                                </div>
                                                <h6 className='d-flex align-items-center text-orange m-0 text-sm w-100 justify-content-start justify-content-md-end'>
                                                    <img src={acService} width={40} alt="" /> {receive.user.businessCategory}
                                                </h6>
                                               
                                            </div>
                                            <h4 className="">{receive.user.name}</h4>
                                            <p className='d-flex align-items-center gap-2 text'><FaLocationDot /> {receive?.user?.address?.area} {receive?.user?.address?.city} {receive?.user?.address?.state} {receive?.user?.address?.country} {receive?.user?.address?.pincode}</p>

                                            <div className='pt-2 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-start w-100'>
                                                {receive.status === "received" ? (
                                                    <Link to={`tel:${receive.user.phone}`} className='btn pt-2 w-50 border-green rounded-1 text-semibold text-green btn-outline-orange'>
                                                        Contact Now
                                                    </Link>
                                                ) : (
                                                    <Link onClick={() => handleAcceptRequest(receive.user._id)} className='btn pt-2 w-50 border-orange rounded-1 text-semibold text-orange btn-outline-orange'>
                                                        Accept
                                                    </Link>
                                                )}
                                                {receive.status === "received" ? (
                                                    <Link onClick={() => handleWorkDone(receive.user._id)} className='btn pt-2 w-50 border-green rounded-1 text-semibold text-green btn-outline-orange' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Work Done
                                                    </Link>
                                                ) : (
                                                    <Link onClick={() => cancelRequest(receive.user._id)} className='btn pt-2 w-50 border-orange rounded-1 text-semibold text-orange btn-outline-orange'>
                                                        Cancel
                                                    </Link>
                                                )}
                                            </div>
                                            <Rating serviceProviderId={serviceProviderId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recievedrequest;
