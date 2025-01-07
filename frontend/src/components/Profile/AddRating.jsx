import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const backend_API = import.meta.env.VITE_API_URL;

const AddRating = ({ serviceProviderId }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    
    // Check if the token exists before proceeding
    if (!token) {
        alert("You are not logged in!");
        return null;
    }

    const [providerRating, setProviderRating] = useState(() => {
        const savedRating = localStorage.getItem("providerRating");
        return savedRating ? JSON.parse(savedRating) : 0; // Default to 0 if no rating is stored
    });

    const [comment, setComment] = useState(() => {
        return localStorage.getItem("comment") || ""; // Retrieve saved comment if any
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // For managing submit button state

    // Handle provider rating click
    const handleProviderRatingClick = (rating) => {
        setProviderRating(rating);
        localStorage.setItem("providerRating", JSON.stringify(rating)); // Store provider rating in localStorage
    };

    const renderStars = (rating, maxRating = 5, onClick) => {
        return Array.from({ length: maxRating }, (_, i) => (
            <FaStar
                key={i + 1}
                className={`${i + 1 <= rating ? "text-warning" : ""}`}
                onClick={() => onClick(i + 1)}
                style={{ cursor: "pointer" }}
            />
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation before submission
        if (!providerRating) {
            alert("Please provide a rating before submitting.");
            return;
        }

        setIsSubmitting(true); // Disable submit button

        try {
            const response = await axios.post(`${backend_API}/user/rate`, {
                    serviceProviderId,
                    rating: providerRating,
                    comment,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Clear stored values after successful submission
                localStorage.removeItem("providerRating");
                localStorage.removeItem("comment");
                setProviderRating(0);
                setComment("");
                alert("Rating submitted successfully.");
            } else {
                alert("Failed to submit rating. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting rating:", error.response?.data || error.message);
            alert("An error occurred while submitting your rating.");
        } finally {
            setIsSubmitting(false); // Re-enable submit button
        }
    };

    // Save comment to localStorage as user types
    useEffect(() => {
        localStorage.setItem("comment", comment);
    }, [comment]);

    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Rate User {serviceProviderId}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {/* Provider Rating */}
                            <div className="rating rating-sm py-3 w-full text-center d-flex align-items-center justify-content-center fs-2">
                                {renderStars(providerRating, 5, handleProviderRatingClick)}
                            </div>
                            <div className="my-3">
                                <label className="block text-md fs-4 p-2 text-bold">Comment</label>
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-100 p-2 rounded border"
                                    placeholder="Write your comment here..."
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRating;
