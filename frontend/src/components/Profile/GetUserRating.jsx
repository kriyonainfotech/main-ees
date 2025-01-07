import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Icons for filled and empty stars

const backend_API = import.meta.env.VITE_API_URL;

const GetUserRating = () => {
  const [rating, setRating] = useState(null); // Rating as a number
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${backend_API}/user/getrate`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log(response.data.average, "Ratings data");
          setRating(response.data.average); // Set the average rating
        } else {
          console.error("Failed to fetch Ratings");
        }
      } catch (err) {
        console.error("Error fetching Ratings:", err);
      }
    };

    fetchRatings();
  }, []);

  // Function to render stars based on the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      if (i <= Math.round(rating)) {
        // Use filled stars for ratings
        stars.push(<FaStar key={i} className="text-warning" />);
      } else {
        // Use empty stars for remaining
        stars.push(<FaStar key={i} className="text-muted" />);
      }
    }
    return stars;
  };
  // const renderStars = (rating, maxRating = 10) => {
  //   const stars = [];
  //   for (let i = 1; i <= maxRating; i++) {
  //     stars.push(
  //       <FaStar
  //         key={i}
  //         className={` ${i <= rating ? "text-warning" : "text-muted"}`}
  //         style={{ cursor: "pointer" }}
  //       />
  //     );
  //   }
  //   return stars;
  // };
  const userRating = rating?.length
  ? rating.reduce((acc, curr) => acc + curr.rating, 0) / rating.length
  : 0; // Average rating if available, otherwise default to 0.


  return (
    <div className="flex flex-col">
      {rating !== null ? (
        <div className="flex items-center">
          {renderStars()}
          <span className="ml-2 text-sm font-medium">({rating.toFixed(1)})</span>
        </div>
      ) : (
        <p>Loading rating...</p>
      )}
    </div>
  );
};

export default GetUserRating;
