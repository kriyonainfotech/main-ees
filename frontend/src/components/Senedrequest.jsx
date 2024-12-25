import React, { useEffect, useState } from 'react'
import { FaLocationDot, FaPhone, FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import AdminNavbar from '../admincomponents/AdminNavbar'
import UserSideBar from './UserSideBar'
import acService from '../../public/service-icons/ac service.png'
import axios from 'axios'
import { toast } from 'react-toastify'

const backend_API = import.meta.env.VITE_API_URL;

const Senedrequest = ({ sendedRequest, isReceiverAvailable }) => {
    const [status, setStatus] = useState('');
    const token = JSON.parse(localStorage.getItem('token'))
    // Render stars for the rating
        const renderStars = (rating, maxRating = 5,) => {
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
    // console.log(token , "token in sendreq");
    console.log(sendedRequest, "sended status");

    useEffect(() => {
        let sendeReq = [...sendedRequest]
        sendeReq.forEach((req) => {
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

    }, [sendedRequest])

    return (
        <>
            <AdminNavbar />
            <UserSideBar />
            <div className='mt-2'>
                <section>
                    <div className="container">
                        <div className="row">

                            <div className="col-12 pt-3">
                                <h4>Sended Request</h4>
                            </div>
                            <div className="col-12 flex flex-wrap py-2">
                                {sendedRequest.map((receive, i) => {
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
                                                    <div className='w-full pt-2'>
                                                        <div className='d-flex flex-column flex-md-row  justify-content-start justify-content-md-between'>
                                                            <div className="rating rating-sm py-4 d-flex align-items-center">
                                                                {
                                                                    receive?.user?.ratings ? (
                                                                        <div className=' d-flex align-items-center'>
                                                                            {renderStars(receive?.user?.ratings.map((r) => {
                                                                                return r.rating
                                                                            }), 5,)}
                                                                            <span className="ps-2 ">{receive?.user?.ratings.map((r) => {
                                                                                return r.rating
                                                                            })}</span>
                                                                            {/* <FaStar className= {` ${Usersdata.ratings ? "d-flex" : "d-none"}`}  /> */}
                                                                        </div>
                                                                    ) : (<></>)
                                                                }

                                                            </div>

                                                            <h6 className='d-flex align-items-center text-orange m-0 text-sm'><span>
                                                                <img src={acService} width={40} alt="" />
                                                            </span> {receive.user.businessCategory}</h6>

                                                        </div>
                                                        <h4 className="">{receive.user.name}</h4>
                                                        <h6 className='pt-2'></h6>
                                                        <p className='d-flex align-items-center gap-1' ><FaLocationDot /> {receive?.user?.address?.area} </p>

                                                        <div className='pt-2 d-flex   gap-2  justify-content-between align-items-start w-100 flex-md-row'>
                                                            {
                                                                receive.status === "received" ? (
                                                                    <Link to={`tel:${receive.user.phone}`} className='btn pt-2  w-50  border-green rounded-1 text-semibold text-green btn-outline-orange' >
                                                                        Contect Now
                                                                    </Link>
                                                                ) : (<Link onClick={() => cancleRequest(receive.user._id)} className='btn pt-2  w-50  border-orange rounded-1 text-semibold text-orange btn-outline-orange' >
                                                                    cancle
                                                                </Link>)
                                                            }
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )

                                })}

                            </div>
                        </div>
                    </div>

                </section>
            </div>


        </>
    )
}

export default Senedrequest