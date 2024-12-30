import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../admincomponents/AdminNavbar';
import UserSideBar from '../components/UserSideBar';
import SearchResult from '../components/SearchResult';
import { UserContext } from '../UserContext';

const backend_API = import.meta.env.VITE_API_URL;

const ServiceDetail = () => {
    const { user } = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem('token'));

    const [category, setCategory] = useState(() => {
        // Retrieve category from localStorage if available
        return localStorage.getItem('selectedCategory') || null;
    });
    const [service, setService] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(() => {
        // Retrieve logged-in user from localStorage or context
        return user || JSON.parse(localStorage.getItem('loggedInUser')) || null;
    });

    const location = useLocation();

    // Fetch data function
    const fetchData = async (cat, loggedInUserCity) => {
        try {
            const response = await axios.get(`${backend_API}/auth/getAllUser`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            const data = response.data.user;

            // Filter users based on category and city
            const filteredData = data.filter(
                (user) =>
                    user.businessCategory?.some((category) => category.toLowerCase() === cat?.toLowerCase()) &&
                    user.address?.city?.toLowerCase() === loggedInUserCity?.toLowerCase()
            );
            setService(filteredData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Set category from location state or localStorage
    useEffect(() => {
        if (location.state) {
            setCategory(location.state);
            localStorage.setItem('selectedCategory', location.state); // Save category to localStorage
        }
    }, [location.state]);

    // Fetch data when category and user city are available
    useEffect(() => {
        if (category && loggedInUser?.address?.city) {
            fetchData(category, loggedInUser.address.city);
        }
    }, [category, loggedInUser?.address?.city]);

    // Persist logged-in user to localStorage
    useEffect(() => {
        if (user) {
            setLoggedInUser(user);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        }
    }, [user]);

    return (
        <>
            <AdminNavbar />
            <UserSideBar />
            <section className="mt-32">
                <div className="container">
                    <div className="row">
                        <div className="d-flex">
                            <h3 className="py-4 px-3">Services Detail</h3>
                        </div>

                        <div className="col-12 d-flex flex-wrap">
                            {service.length > 0 ? (
                                service.map((Usersdata, i) => (
                                    <SearchResult key={i} Usersdata={Usersdata} token={token} />
                                ))
                            ) : (
                                <h4>No item Found</h4>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceDetail;
