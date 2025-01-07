import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiShoppingBagLight } from "react-icons/pi";
import { FaStar } from 'react-icons/fa';
import UserSideBar from '../components/UserSideBar';
import AdminNavbar from '../admincomponents/AdminNavbar';
import BannerAdd from '../components/ProfileBanner/BannerAdd';
import AllBannners from '../components/ProfileBanner/AllBannners';
import { UserContext } from '../UserContext';
import ProfileSidebar from '../components/ProfileSidebar';
import GetUserRating from '../components/Profile/GetUserRating';
import CurrentLocation from '../components/Profile/CurrentLocation';

const backend_API = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { user } = useContext(UserContext);
    const [linkCopied, setLinkCopied] = useState(false);
    const navigate = useNavigate();

    const referralLink = `https://ess-frontend-eight.vercel.app/register?referralCode=${user?.referralCode}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
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
        <>
            <AdminNavbar />
            <UserSideBar />
            <ProfileSidebar />
            <div className='my-24'>
                <section className='p-4'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="card rounded-md overflow-hidden border-0 bg-base-100 shadow-xl">
                                    <div className="w-full position-relative bg-orange flex items-center justify-center">
                                        <img className='h-[200px] w-full' src="https://img.freepik.com/free-vector/colorful-watercolor-texture-background_1035-19319.jpg?ga=GA1.1.897959581.1731651336&semt=ais_hybrid" alt="" />
                                        <div className="avatar">
                                            <div className="position-absolute w-[150px] h-[150px] top-[120px] start-[50px] overflow-hidden ring-green ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
                                                <img src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"} alt="Profile" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="col-12 d-flex flex-wrap">
                                            <div className="col-12 col-md-6 p-5">
                                                <div className="rats pt-5">
                                                    <h2 className="text-sm text-start font-bold">User Rating</h2>
                                                    <GetUserRating />
                                                    <div className="rating d-flex  flex-col rating-sm py-2 ">
                                                        <h2 className=" text-sm font-bold">Provider Rating</h2>
                                                        <div className='d-flex'>
                                                            {renderStars(userRating, 10)}
                                                            <span className=' ms-2 p-0 '>({userRating.toFixed(1)})</span>
                                                        </div>
                                                    </div>

                                                </div>
                                                <h2 className="text-3xl font-bold text-gray-700">{user?.name}</h2>
                                                <h6 className='py-3 text-gray'>{user?.email}</h6>
                                                <p className='text-gray pb-3'> +91{user?.phone}</p>
                                                <CurrentLocation user={user} />
                                                <div className="flex">
                                                    <button onClick={() => navigate(`/editprofile`, { state: user })} className="text-orange py-3 rounded-full font-semibold uppercase text-sm">Edit Profile</button>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-start">
                                                <div className='p-5 w-full'>
                                                    <p className='text-gray'>Your Referral Link :</p>
                                                    <span onClick={copyToClipboard} className="text-blue-500 cursor-pointer">{referralLink}</span>
                                                    {linkCopied && <p className="text-green-500">Link copied!</p>}

                                                    <h6 className='text-gray py-3'>Business Category <PiShoppingBagLight className='inline-block' /></h6>
                                                    {user?.businessCategory && (
                                                        <div className='btn d-flex justify-content-center text-uppercase rounded-md text-white bg-orange py-2'>{user.businessCategory}</div>
                                                    )}


                                                    <div className='pt-4'>
                                                        <BannerAdd />
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

                <AllBannners />
            </div>
        </>
    );
}

export default Profile;
