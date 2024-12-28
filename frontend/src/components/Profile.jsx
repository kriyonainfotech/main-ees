import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PiShoppingBagLight } from "react-icons/pi";
import axios from 'axios';
import UserSideBar from './UserSideBar';
import AdminNavbar from '../admincomponents/AdminNavbar';
import { FaStar } from 'react-icons/fa';
import BannerAdd from './ProfileBanner/BannerAdd';
import AllBannners from './ProfileBanner/AllBannners';
import { UserContext } from '../UserContext';

const backend_API = import.meta.env.VITE_API_URL;
const Profile = () => {
    const { user } = useContext(UserContext);
    const [linkCopied, setLinkCopied] = useState(false);

    const [userRating, setUserRating] = useState(() => {
        const savedRating = localStorage.getItem("userRating");
        return savedRating ? JSON.parse(savedRating) : 0; // Default to 0 if no rating is stored
    });
    const navigate = useNavigate();

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
    const referralLink =`https://ess-frontend-eight.vercel.app/register?referralCode=${user?.referralCode}`
    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      };
    return (
        <>
            <AdminNavbar />
            <UserSideBar />
            <section className='mt-24 p-4'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card rounded-md overflow-hidden border-0 bg-base-100 shadow-xl ">

                                <div className="w-full position-reletive bg-orange flex items-center justify-center">

                                    <img className='h-[150px] w-full' src="https://img.freepik.com/free-vector/colorful-watercolor-texture-background_1035-19319.jpg?ga=GA1.1.897959581.1731651336&semt=ais_hybrid" alt="" />

                                    <div className="avatar">
                                        <div className=" position-absolute top-[100px] start-[50px] overflow-hidden ring-green ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                            <img src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="col-12 d-flex flex-wrap ">
                                        <div className="col-12 col-md-6 p-5">
                                            <h2 className="text-3xl font-bold  text-gray-700  mt-4">
                                                {user?.name}
                                            </h2>
                                            <h6 className='py-3 text-gray'>{user?.email}</h6>
                                            <p className='text-gray pb-3'> +91{user?.phone}</p>
                                            {/* <p className='text-gray pb-3'>  {user?.address?.area}</p> */}
                                            <p className="text-gray pb-3">
                                                {user?.address?.area} {user?.address?.city}  {user?.address?.state} {user?.address?.country}  {user?.address?.pincode}
                                            </p>

                                            <div className="flex">
                                                <button onClick={() => navigate(`/editprofile`, { state: user })} className=" text-orange py-3 rounded-full font-semibold uppercase text-sm">Edit Profile</button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-start">
                                            <div className='p-5 w-full'>
                                                {/* <input type="text" value={} readOnly /> */}
                                                <p className='text-gray'>Your Reffrele Link :</p>
                                                <Link  onClick={copyToClipboard}>{referralLink}</Link>
                                                {linkCopied && <p>Link copied</p>}
                                                {/*
                                                <a href={`https://ess-frontend-eight.vercel.app/register`} target='_blank'>https://ess-frontend-eight.vercel.app/register?referralCode={user?.referralCode}</a>
                                                */}
                                                {/* <span className='py-2'> {user?.referralCode}</span> */}
                                                <h6 className='text-gray py-3'>Bussiness Category <PiShoppingBagLight className='inline-block' /></h6>
                                                {user?.businessCategory ? (<div className='btn w-50  d-flex justify-content-center text-uppercase rounded-md text-white bg-orange py-2'>{user.businessCategory}</div>) : (<></>)}

                                                <div className="rating rating-sm py-3 w-full text-center d-flex align-items-center  ">
                                                    {renderStars(user?.ratings.map((r) => {
                                                        return r.rating
                                                    }), 5,)}

                                                    {/* <span className='btn ms-2 p-0 px-3 bg-green text-white'>{userRating}</span> */}
                                                    <span className='btn ms-2 p-0 px-3 bg-green text-white'>{
                                                        user?.ratings.map((r) => {
                                                            return r.rating
                                                        })
                                                    }</span>
                                                </div>
                                                <BannerAdd />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AllBannners />

        </>
    )
}

export default Profile