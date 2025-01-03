import React, { useEffect, useState } from 'react';
import Card from './Card';
import ServieceCategories from '../components/ServieceCategories';
import Benner from '../components/Benner';
import AdminNavbar from '../admincomponents/AdminNavbar';
import UserSideBar from '../components/UserSideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getFcmToken, messaging } from '../Firebaseconfig';
import { onMessage } from 'firebase/messaging';
import ProfileSidebar from '../components/ProfileSidebar';

const backend_API = import.meta.env.VITE_API_URL;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);
  const [auth, setAuth] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Get FCM Token on mount
  useEffect(() => {
    getFcmToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
    });
  }, []);

  // Fetch Categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backend_API}/category/getAllCategory`);
      const sortedCategories = response.data.category.sort((a, b) =>
        a.categoryName.localeCompare(b.categoryName)
      );
      setCategories(sortedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Process categories and banners into groups
  const processCategoriesAndBanners = (categories, BannerImage, categoryGroupSize = 15, bannerGroupSize = 10) => {
    const groupedResult = [];
    let i = 0;
    let j = 0;

    while (i < categories.length || j < BannerImage.length) {
      const group = {
        categories: categories.slice(i, i + categoryGroupSize),
        BannerImage: BannerImage.slice(j, j + bannerGroupSize),
      };

      groupedResult.push(group);
      i += categoryGroupSize;
      j += bannerGroupSize;
    }

    return groupedResult;
  };

  // Fetch categories once when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Memoize grouped categories and banners to avoid recalculation on each render
  const groupedCategoriesAndBanners = React.useMemo(
    () => processCategoriesAndBanners(categories, bannerImage, 15, 10),
    [categories, bannerImage]
  );

  // Set authentication state based on token
  useEffect(() => {
    setAuth(Boolean(token));  // Simplified check for token existence
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <UserSideBar />
      <ProfileSidebar />
      <div className='my-28'>
        {/* Render Card only if user is authenticated */}
        {auth && <Card />}

        <div>
          {groupedCategoriesAndBanners.map((group, index) => (
            <React.Fragment key={index}>
              <Benner BannerImage={group.BannerImage} setBannerImage={setBannerImage} />
              <ServieceCategories categories={group.categories} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
