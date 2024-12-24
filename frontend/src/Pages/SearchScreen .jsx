import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navebar from '../components/Navebar';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaLocationArrow, FaLocationDot, FaPhone, FaServer } from 'react-icons/fa6';
import { FaRegAddressCard, FaSearch, FaStar } from 'react-icons/fa';
import UserSideBar from '../components/UserSideBar';
import axios from 'axios';
import ServiceDetail from './ServiceDetail';
import SearchResult from '../components/SearchResult';
import SearchBox from '../components/SearchBox';

const backend_API = import.meta.env.VITE_API_URL; 

// const backend_API = "https://ees-121-backend.vercel.app"

const SearchScreen = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const [categories, setCategories] = useState([]);
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate();

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${backend_API}/category/getAllCategory`);
            const sortedCategories = response.data.category.sort((a, b) =>
                a.categoryName.localeCompare(b.categoryName)
            );

            setCategories(sortedCategories);
            // console.log(sortedCategories, "sortedCategories");
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])
    useEffect(() => {
        if (token) {
            setAuth(true)
        } else {
            setAuth(false)
        }


    }, [token])


    return (
        <>
            <section>
                <div className="container bd-orange">
                        <div className="row row-cols-3 row-cols-lg-5 overflow-hidden">
                            {
                                categories.map((user, i) => (
                                    <div key={++i} className="col" style={{ cursor: "pointer" }} onClick={() => navigate(`/serviceDetail`, { state: user.categoryName })}>
                                        <div className="border-0 w-100 h-100  text-center items-center rounded-md ">
                                            <figure className='w-full m-0 p-2 '>
                                                <img className='img-fluid w-100 border-orange rounded-4 p-1 overflow-hidden ' style={{ objectFit: "cover" }} src={user.image} >
                                                </img>
                                            </figure>
                                            <h6 className='text-md text-capitalize'>{user.categoryName}</h6 >
                                        </div>


                                    </div>
                                ))}
                        </div>
                </div>
            </section>
        </>
    )
}

export default SearchScreen 
