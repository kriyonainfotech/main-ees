import { FaStar } from 'react-icons/fa'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../UserContext';

const backend_API = import.meta.env.VITE_API_URL;

// const backend_API = "https://ees-121-backend.vercel.app"

const Card = () => {
    const { user } = useContext(UserContext);
    console.log(user, "login user in card");

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
    return (
        <>
            <section className='mt-24 p-4'>
                <div className="container">
                    <div className="row">
                        <div className="card border-0 card-side bg-base-100 rounded-md shadow-xl w-full p-3   pt-3  ">
                            <div className="col-12 d-flex flex-wrap">
                                <div className="col-12 col-lg-4 w-full d-flex justify-content-center  text-gray-900 py-2">
                                    <div>
                                        <figure className=''>
                                            <img className='rounded-md w-[200px]  overflow-hidden'
                                                src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"}
                                                alt="Movie" />
                                        </figure>
                                        <div className='text-center'>
                                            <h1 className='text-xl'>{user?.name}</h1>
                                        </div>

                                        <div>
                                        <div className="rating rating-sm py-3 w-full text-center d-flex align-items-center  ">
                                                {renderStars( user?.ratings.map((r) =>{
                                                    return r.rating
                                                }), 5,)}
                                               
                                                {/* <span className='btn ms-2 p-0 px-3 bg-green text-white'>{userRating}</span> */}
                                                <span className='btn ms-2 p-0 px-3 bg-green text-white'>{
                                                user?.ratings.map((r) =>{
                                                    return r.rating
                                                })
                                                }</span>
                                               
                                            </div>
                                             <div className=" rating rating-sm d-flex align-items-center">
                                                                <FaStar className='text-warning' />
                                                                <FaStar className='text-warning' />
                                                                <FaStar className='text-warning' />
                                                                <FaStar className='' />
                                                                <FaStar className='' />
                                                                <span className='btn ms-2 p-0 px-3 bg-green text-white'>
                                                                3
                                                            </span>
                                                            </div>
                                                            

                                            {/* Provider Rating */}
                                            {/* <div className="rating rating-sm py-1 w-full text-center d-flex align-items-center justify-content-center">
                                                {renderStars(providerRating, 5, handleProviderRatingClick)}
                                                <span className=' mx-2 p-0 px-3 bg-green rounded-1 text-white'>{providerRating}</span>
                                                <span> Provider</span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt col-12 col-lg-8  text-gray-700 sm:col-span-2 sm:mt-0">
                                    <div className=" p-2 shadow-xl mb-1 bg-white d-flex align-items-center text-start ">
                                        <div className='col-4 p-2 '>
                                            <h6 className=''>Email</h6>
                                        </div>
                                        <div className='col-8 p-2 text-gray'>
                                            <p>  {user?.email}</p>
                                        </div>

                                    </div>
                                    <div className=" p-2 shadow-xl mb-1 bg-white d-flex align-items-center ">

                                        <div className='col-4 p-2 '>
                                            <h6 >Contact</h6>
                                        </div>
                                        <div className='col-8 p-2 text-gray'>
                                            <p>{user?.phone}</p>
                                        </div>

                                    </div>
                                    <div className=" p-2 shadow-xl mb-1 bg-white d-flex align-items-center ">
                                        <div className='col-4  p-2 '>
                                            <h6 >Address</h6>
                                        </div>
                                        <div className='col-8 p-2  text-gray'>
                                            <p>{user?.address?.area} {user?.address?.city} {user?.address?.state} {user?.address?.country} {user?.address?.pincode}</p>
                                        </div>
                                    </div>
                                    <div className=" p-2 shadow-xl mb-1 bg-white d-flex align-items-center">

                                        <div className='col-4 text-sm p-2 '>
                                            <h6 >Available</h6>
                                        </div>
                                        <div className='col-8 p-2 '>
                                            <div className="checkbox-con">
                                                <input id="checkbox" type="checkbox" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Card
