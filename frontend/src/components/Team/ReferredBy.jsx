import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";

const backend_API = import.meta.env.VITE_API_URL;

const ReferredBy = () => {
    const { user } = useContext(UserContext);
    const [referredBy, setReferredBy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReferrals = async () => {
            if (!user?._id) return; // Ensure user ID exists

            try {
                const response = await axios.get(`${backend_API}/api/getReferredBy/${user?._id}`);
                if (response.status === 200) {
                    // console.log(response.data.referredBy, "refralsBy");

                    setReferredBy(response.data.referredBy);

                } else {
                    setError("Failed to fetch referrals");
                }
            } catch (err) {
                console.error("Error fetching referrals:", err);
                setError(err.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchReferrals();
    }, [user?._id]);

    if (loading) return <p>Loading referrals...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
       
            <div className="col-12 col-md-6 p-1">
            <h4 className="py-2" >ReffredBy</h4>
                {referredBy.length > 0 ? (
                    referredBy.map((referral, i) => (
                        <div key={i} className="list text-black rounded-1 w-100 shadow-xl bg-white d-flex align-items-center p-1 ">
                            <div className="list-item w-100 gap-2 d-flex align-items-center p-2 justify-content-between">
                                <div className="wicon text-green bg-white p-2 rounded-full">
                                    <FaUserAlt />
                                </div>
                                <div className="wUser d-flex flex-column ">
                                    <h6 className="">{referral.name || "Unknown User"}</h6>
                                    <p className="text-muted">{referral.email || "No Email"}</p>
                                </div>
                                <div className="credit ms-auto">
                                    {/* Display user's earnings (replace `78` with actual data if available) */}
                                    <span>&#8377;0</span>
                                </div>
                            </div>
                        </div>
                    ))

                ) : (
                    <p>No referrals found</p>
                )}
            </div>
       
    );
};

export default ReferredBy;
