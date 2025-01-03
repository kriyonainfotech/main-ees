import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Backend API URL from environment variables
const backend_API = import.meta.env.VITE_API_URL;

const AllBanners = () => {
    const [bannerImages, setBannerImages] = useState([]); // Store banners
    const [error, setError] = useState(null); // To manage error state
    const token = JSON.parse(localStorage.getItem('token')); // Retrieve token from localStorage

    // Ensure token exists before API calls
    if (!token) {
        return <div>You must be logged in to view banners.</div>;
    }

    // Fetch banners for the logged-in user
    const getUserBanners = async () => {
        try {
            const response = await axios.get(`${backend_API}/banner/getBanners`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setBannerImages(data.banners); // Set banners in state
            }
        } catch (error) {
            setError('Error fetching banners. Please try again later.');
            console.error("Error fetching banners:", error);
        }
    };

    // Delete a specific banner by ID
    const deleteBanner = async (bannerId) => {
        try {
            const response = await axios.delete(`${backend_API}/banner/deleteBanner`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                data: { bannerId }, // Pass bannerId in request body
            });

            if (response.status === 200) {
                console.log("Banner deleted successfully");
                getUserBanners(); // Refresh the list of banners after deletion
            }
        } catch (error) {
            setError('Error deleting banner. Please try again later.');
            console.error("Error deleting banner:", error);
        }
    };

    // Fetch banners on component mount
    useEffect(() => {
        getUserBanners();
    }, []);

    return (
        <section className="mt-3">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex flex-wrap">
                        {/* Display error message if any */}
                        {error && <div className="alert alert-danger">{error}</div>}
                        
                        {bannerImages.length > 0 ? (
                            bannerImages.map((banner, index) => (
                                <div key={index} className="col-md-4 p-1">
                                    <div className="card card-banners h-100 w-100 overflow-hidden">
                                        <div className="img-banner" style={{ height: "100%" }}>
                                            <img
                                                src={banner.imageUrl}
                                                className="card-img-top overflow-hidden img-fluid"
                                                style={{ objectFit: "cover", height: "100%" }}
                                                alt={banner.description || "Banner"} // Meaningful alt text
                                            />
                                        </div>
                                        <div className="banner-Btn">
                                            <button
                                                className="btn bg-orange text-white"
                                                onClick={() => deleteBanner(banner._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No banners available.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllBanners;
