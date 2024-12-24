import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import AdminNavbar from '../admincomponents/AdminNavbar';
import UserSideBar from '../components/UserSideBar';
import { HiDotsHorizontal } from "react-icons/hi";
import SearchResult from '../components/SearchResult';
import { UserContext } from '../UserContext';
const backend_API = import.meta.env.VITE_API_URL;

const ServiceDetail = () => {
    const { user } = useContext(UserContext);
    console.log(user,"login user data");
    const token = JSON.parse(localStorage.getItem('token'))
    const [category, setCategory] = useState();
    const [service, setService] = useState([]);
    const [loggedInUser, setloggedInUser] = useState(user);
      const [requestSent, setRequestSent] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state,"state id");

    const fetchData = async (cat, loggedInUserCity) => {
        try {
            const response = await axios.get(`${backend_API}/auth/getAllUser`,{
                headers: {
                    'Content-Type': 'application/json',
                    },
                    withCredentials :true
            })
            const data = response.data.user;
            console.log(response.data.user ,"All user fetch");
            
            // Filter users where `businessCategory` includes `cat` and `address.city` matches logged-in user's city
            const filteredData = data.filter(
                (user) =>
                    user.businessCategory?.some((category) => category.toLowerCase() === cat.toLowerCase()) &&
                    user.address?.city?.toLowerCase() === loggedInUserCity?.toLowerCase()
            );
            console.log(filteredData, "Filtered Data");
            setService(filteredData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        if (location.state && loggedInUser?.address?.city) {
            const categoryName = location.state;
            setCategory(categoryName); // Set the category in state
            fetchData(categoryName, loggedInUser?.address?.city); // Fetch data with category and city
        }
    }, [location.state, loggedInUser?.address?.city]);

    return (
        <>
            <AdminNavbar />
            <UserSideBar />
            <section className='mt-32'>
                <div className="container">
                    <div className="row">
                        <div className='d-flex'>
                            <h3 className='py-4 px-3'>Servies Detaile </h3>
                        </div>

                        <div className="col-12 d-flex flex-wrap">
                        {
                                service.length > 0 ? (
                                    service.map((Usersdata, i) => (
                                        <SearchResult key={i} Usersdata={Usersdata} token={token}  />
                                    ))
                                ) : (
                                    <h4>No item Found</h4>
                                )
                            }       
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ServiceDetail
