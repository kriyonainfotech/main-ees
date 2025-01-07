import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import GetUserRating from "../Profile/GetUserRating";

const backend_API = import.meta.env.VITE_API_URL;

const TotalWallete = () => {
  const { user } = useContext(UserContext); 
  const [earnings, setEarnings] = useState(0); 
  const [earningsHistory, seteEarningsHistory] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!user?._id) return; // Ensure user ID exists

      try {
        const response = await axios.get(`${backend_API}/api/earnings/${user?._id}`);
        if (response.status === 200) {
          console.log(response.data, "earning data");
          console.log(response.data.earnings, "earning");
          
          setEarnings(response.data.earnings);
        } else {
          setError("Failed to fetch earnings");
        }
      } catch (err) {
        console.error("Error fetching earnings:", err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [user?._id]);

  if (loading) return <p>Loading earnings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
   <>
    <div className="col-4 col-md-4 d-flex align-items-center justify-content-center">
      <div className="card w-100 rounded-1   border-0 shadow-xl p-2 py-3">
        <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
          <span className="text-capitalize">Total</span>
          <h3>&#8377;{earnings || 0}</h3>
        </div>
      </div>
    </div>
    <div className="col-4 col-md-4 d-flex align-items-center justify-content-center p-1">
      <div className="card w-100 rounded-1   border-0 shadow-xl p-2 py-3">
        <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
          <span className="text-capitalize">Tranfer</span>
          <h3>&#8377;{earnings || 0}</h3>
        </div>
      </div>
    </div>
    <div className="col-4 col-md-4 d-flex align-items-center justify-content-center">
      <div className="card w-100 rounded-1   border-0 shadow-xl p-2 py-3">
        <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
          <span className="text-capitalize">Withdraw</span>
          <h3>&#8377;{earnings || 0}</h3>
        </div>
      </div>
    </div>
   </>
  );
};

export default TotalWallete;
