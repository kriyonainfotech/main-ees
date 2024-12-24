import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from 'react-toastify';
const backend_API = import.meta.env.VITE_API_URL;

// const backend_API = "https://ees-121-backend.vercel.app"

const SearchResult = ({ Usersdata, token }) => {
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [allrequest , setAllRequest] = useState([])


    
    // Check request status on mount
    useEffect(() => {
        const checkRequestStatus = async () => {
            try {
                const response = await axios.get(`${backend_API}/request/status`, {
                    params: { receiverId: Usersdata?._id },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const { isSent } = response.data;
                    setIsRequestSent(isSent);

                    // Update localStorage to reflect the current status
                    const sentRequests = JSON.parse(localStorage.getItem('sentRequests')) || [];
                    if (isSent) {
                        if (!sentRequests.includes(Usersdata?._id)) {
                            sentRequests.push(Usersdata?._id);
                            localStorage.setItem('sentRequests', JSON.stringify(sentRequests));
                        }
                    } else {
                        const updatedRequests = sentRequests.filter(id => id !== Usersdata?._id);
                        localStorage.setItem('sentRequests', JSON.stringify(updatedRequests));
                    }
                }
            } catch (error) {
                console.error('Error checking request status:', error.response?.data || error.message);
            }
        };

        checkRequestStatus();
    }, [Usersdata?._id, token]);    
    const sendRequest = async (userId) => {
        console.log(userId);    
        if (isRequestSent) return; // Prevent duplicate requests

        try {
            const response = await axios.post(`${backend_API}/request/sentRequest`, {
                receiverId: userId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })           
            if (response.status === 200) {
                // Save the user ID to localStorage to persist state
                const sentRequests = JSON.parse(localStorage.getItem('sentRequests')) || [];
                sentRequests.push(userId);
                localStorage.setItem('sentRequests', JSON.stringify(sentRequests));

                setIsRequestSent(true);
                toast(`Request Sent Successfully!`)
                // alert("Request Sent Successfully!");
            } else {
                alert("Failed to send request!");
            }
        } catch (error) {
            console.error('Error sending request:', error.response?.data || error.message);
    
        }

    };
    
    return (

        <>
            <div className="col-12 col-md-6 col-xl-3 p-2" style={{ cursor: "pointer" }}>
                <div className="card border-0 bg-base-100 shadow-xl" >
                    <div className='d-flex justify-content-between'>
                        <figure className='rounded-md m-3'>
                            <img src={Usersdata?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"} >

                            </img>
                        </figure>
                        <span className='bg-white rounded-full m-2 shadow-xl w-[30px] h-[30px] d-flex align-items-center justify-content-center '><HiDotsHorizontal /></span>
                    </div>
                    <div className='p-3'>
                        <h2 className=" font-bold">{Usersdata?.name}</h2>
                        <h5 className=" font-bold">{Usersdata?.businessCategory}</h5>
                        <h6 className=" font-bold">{Usersdata?.address.city}</h6>

                        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, laborum.</p>
                        <div className="rating rating-sm py-4 d-flex align-items-center">
                            <FaStar className='text-warning' />
                            <FaStar className='text-warning' />
                            <FaStar className='text-warning' />
                            <FaStar className='text-warning' />
                            <FaStar className='text-warning' /> <span className='ps-2'>rating</span>
                        </div>

                        <div>
                            {/* <button className='btn btn-success' onClick={() => sendRequest(user._id)}>
                                    Contect Now
                                </button> */}


                            {!isRequestSent ? (
                                <button className='btn btn-success' onClick={() => sendRequest(Usersdata?._id)}>Send Request</button>
                                
                            ) : (
                                <button className='btn btn-danger' >Cancel Request</button>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default SearchResult