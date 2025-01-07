import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

const backend_API = import.meta.env.VITE_API_URL;

const CurrentLocation = ({ user }) => {
  const [location, setLocation] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch current location using Geolocation and Nominatim API
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data.address, "Fetched Location");

              if (data && data.address) {
                setLocation({
                  area: data.address.suburb || data.address.county || "",
                  city: data.address.state_district || "",
                  state: data.address.state || "",
                  country: data.address.country || "",
                  pincode: data.address.postcode || "",
                });
                // toast.success("Location fetched successfully!");
              } else {
                toast.error("Unable to fetch location details. Please try again.");
              }
            })
            .catch((error) => console.error("Error fetching city:", error));
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Update the user's profile with the fetched location
  const updateProfile = async () => {
    if (!location.area && !location.city && !location.state && !location.country && !location.pincode) {
      toast.error("Please fetch your current location first!");
      return;
    }

    setLoading(true);
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await axios.post(
        `${backend_API}/auth/updateProfile`,
        { address: location }, // Send the location as part of the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token if required
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsEditing(false); // Disable editing after update
        window.location.reload();
      } else {
        toast.error("Failed to update location");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex  gap-2">
        <p className="text-gray pb-3 mb-0">
          {user?.address?.area} {user?.address?.city} {user?.address?.state}{" "}
          {user?.address?.country} {user?.address?.pincode}
        </p>
        <FaEdit
        className="fs-5 cursor-pointer"
          onClick={() => {
            if (isEditing) {
              updateProfile(); // Save on second click
            } else {
              fetchCurrentLocation(); // Fetch location on first click
            }
            setIsEditing(!isEditing); // Toggle editing mode
          }}
        />
      </div>
      {isEditing && (
        <p className="">
          Current Location: {location.area} {location.city} {location.state} {location.country}{" "}
          {location.pincode}
          <button onClick={updateProfile} className="btn border ms-2">Update</button>
        </p>
      )}
    </div>
  );
};

export default CurrentLocation;
