import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../admincomponents/AdminNavbar';
import UserSideBar from '../components/UserSideBar';
import SearchResult from '../components/SearchResult';
import { UserContext } from '../UserContext';
import ProfileSidebar from '../components/ProfileSidebar';

const backend_API = import.meta.env.VITE_API_URL;

const ServiceDetail = () => {
  const { user } = useContext(UserContext);
  const token = useMemo(() => JSON.parse(localStorage.getItem('token')), []);
  const location = useLocation();

  // State for category, services, and logged-in user
  const [category, setCategory] = useState(() => localStorage.getItem('selectedCategory') || null);
  const [service, setService] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(() => 
    user || JSON.parse(localStorage.getItem('loggedInUser')) || null
  );

  // Fetch data based on category and city
  const fetchData = async (cat, loggedInUserCity) => {
    try {
      const response = await axios.get(`${backend_API}/auth/getAllUser`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      const filteredData = response.data.user.filter(
        (user) =>
          user.businessCategory?.some((category) => category.toLowerCase() === cat?.toLowerCase()) &&
          user.address?.city?.toLowerCase() === loggedInUserCity?.toLowerCase()
      );

      setService(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error.message || error);
    }
  };

  // Update category state from location or localStorage
  useEffect(() => {
    if (location.state) {
      setCategory(location.state);
      localStorage.setItem('selectedCategory', location.state);
    }
  }, [location.state]);

  // Fetch data when category and city are available
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
      <ProfileSidebar/>
      <section className="my-32">
        <div className="container">
          <div className="row">
            <div className="d-flex">
              <h3 className="py-4 px-3">Services Detail</h3>
            </div>

            <div className="col-12 d-flex flex-wrap">
              {service.length > 0 ? (
                service.map((Usersdata) => (
                  <SearchResult key={Usersdata.id} Usersdata={Usersdata} token={token} />
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
