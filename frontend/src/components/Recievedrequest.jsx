import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLocationDot, FaPhone, FaStar } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import acService from '../../public/service-icons/ac service.png'
import { toast } from 'react-toastify'

const backend_API = import.meta.env.VITE_API_URL;


const Recievedrequest = ({ recievedRequest, isReceiverAvailable, setIsReceiverAvailable }) => {
    const [status, setStatus] = useState('');
    const token = JSON.parse(localStorage.getItem('token'))
    const naviget = useNavigate()
    const [providerRating, setProviderRating] = useState(() => {
        const savedRating = localStorage.getItem("providerRating");
        return savedRating ? JSON.parse(savedRating) : 0; // Default to 0 if no rating is stored
    });
    // Handle provider rating click
    const handleProviderRatingClick = (rating) => {
        setProviderRating(rating);
        localStorage.setItem("providerRating", JSON.stringify(rating)); // Store provider rating in localStorage
    };
    const renderStars = (rating, maxRating = 5, onClick) => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`${i <= rating ? "text-warning" : ""}`}
                    onClick={() => onClick(i)}
                    style={{ cursor: "pointer" }}
                />
            );
        }
        return stars;
    };

    const handleAcceptRequest = async (senderId) => {
        // console.log(senderId,"sendr id");

        try {
            const response = await axios.post(`${backend_API}/request/receivedRequest`, { senderId: senderId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log(response.data, "recieved data");

            alert("Requests Accept successfully:")
            setStatus("recieved")
            if (response.status === 200) {
                console.log("Requests Accept successfully:", response.data);
            } else {
                console.error("Failed to Accept requests:", response.data.message);
                return null;
            }
        } catch (error) {
            console.error("Error cancel user requests:", error);
            alert("Failed to Accept user requests. Please try again.");
            return null;
        }

    }
    const cancleRequest = async (senderId) => {
        try {
            const response = await axios.post(`${backend_API}/request/cancelRequest`, { senderId: senderId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Requests cansel successfully:")


            if (response.status === 200) {
                console.log("Requests Cancle successfully:", response.data);
            } else {
                console.error("Failed to cancle requests:", response.data.message);
                return null;
            }
        } catch (error) {
            console.error("Error cancel user requests:", error);
            alert("Failed to cancle user requests. Please try again.");
            return null;
        }


    }
    console.log(recievedRequest, "recieved");
    useEffect(() => {

        let recieve = [...recievedRequest]
        recieve.forEach((req) => {
            if (req.status === 'received') {
                setStatus('received')
                // toast(`Request Accepted by ${req.user.name}`)

            }
            else if (req.status === 'canceled') {
                setStatus('canceled')
                // toast(`Request canceled by ${req.user.name}`)
            }
            else if (req.status === 'pending') {
                setStatus('pending')
                // toast(`Request pending by ${req.user.name}`)
            }
        })

    }, [recievedRequest])
    console.log(status, "reciver status");
    const hendleWorkDone = () => {
        // alert("done...")
        const workDone = [...recievedRequest]
        workDone.forEach((req) => {
            if (req.status === 'received') {
                toast(`Work Done by ${req.user.name}`)
            }
        })
    }
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">

                        <div className="col-12 pt-4 pb-3">
                            <h2>Recieved Request</h2>
                        </div>
                        <div className="col-12 flex flex-wrap py-2">
                            {
                                recievedRequest.map((receive, i) => {
                                    return (
                                        <div key={i} className="col-12 col-md-6 w-full col-lg-4 p-1">
                                            <div className="bg-white border-black rounded-md overflow-hidden d-flex shadow flex-md-column " style={{ position: "relative" }}>
                                                <div className='col-5 col-md-12 d-flex'>
                                                    <div className="img p-2 " style={{ height: "300px", width: "100%" }}>
                                                        <img className='img-fluid rounded'
                                                            src={receive?.user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"}
                                                            alt="Movie" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                                                    </div>
                                                    <span className='bg-success position-absolute rounded-full top-5 end-5  p-1 text-sm text-white px-2'>open</span>
                                                </div>
                                                <div className="p-3 pt-0 col-7 col-md-12 d-flex align-items-center">
                                                    <div className='w-full '>
                                                        <div className='d-flex flex-column flex-md-row justify-content-start justify-content-md-between'>
                                                            <div className="rating rating-sm d-flex align-items-center">
                                                                <FaStar className='text-warning' />
                                                                <FaStar className='text-warning' />
                                                                <FaStar className='text-warning' />
                                                                <FaStar className='text-warning' />
                                                                <FaStar className='text-warning' />
                                                            </div>

                                                            <h6 className='d-flex align-items-center text-orange m-0 text-sm'><span>
                                                                <img src={acService} width={40} alt="" />
                                                            </span> {receive.user.businessCategory}</h6>

                                                        </div>
                                                        <h4 className="">{receive.user.name}</h4>
                                                        <h6 className='pt-2'></h6>
                                                        <p className='d-flex align-items-center gap-1' ><FaLocationDot /> {receive.user.address.area} </p>

                                                        <div className='pt-2 d-flex flex-column flex-md-row gap-3  justify-content-between align-items-start w-100 flex-md-row'>

                                                            {
                                                                receive.status === "received" ? (
                                                                    <Link to={`tel:${receive.user.phone}`} className='btn pt-2  w-50  border-green rounded-1 text-semibold text-green btn-outline-orange' >
                                                                        Contect Now
                                                                    </Link>
                                                                ) : (<Link onClick={() => handleAcceptRequest(receive.user._id)} className='btn pt-2  w-50  border-orange rounded-1 text-semibold text-orange btn-outline-orange' >
                                                                    Accept

                                                                </Link>

                                                                )

                                                            }
                                                            {
                                                                receive.status === "received" ? (
                                                                    <Link onClick={hendleWorkDone} className='btn pt-2  w-50  border-green rounded-1 text-semibold text-green btn-outline-orange' data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                                                        work done
                                                                    </Link>
                                                                ) : (
                                                                    <Link onClick={() => cancleRequest(receive.user._id)} className='btn pt-2  w-50  border-orange rounded-1 text-semibold text-orange btn-outline-orange' >
                                                                        cancle
                                                                    </Link>
                                                                )
                                                            }

                                                        </div>
                                                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Rate to User</h1>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        {/* Provider Rating */}
                                                                        <div className="rating rating-sm py-3 w-full text-center d-flex align-items-center justify-content-center fs-2">
                                                                            {renderStars(providerRating, 5, handleProviderRatingClick)}
                                                                            {/* <span className=' mx-2 p-0 px-3 bg-green rounded-1 text-white'>{providerRating}</span>
                                                                            */}
                                                                        </div>
                                                                    </div>
                                                                        {/* <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                                        </div> */}
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Recievedrequest