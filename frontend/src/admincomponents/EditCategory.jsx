import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backend_API = import.meta.env.VITE_API_URL;

const EditCategory = ({ editcategory, fetchCategory }) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryImg, setCategoryImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editcategory) {
            setCategoryName(editcategory.categoryName);
            setPreview(editcategory.image); // Initial preview
        }
    }, [editcategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName) {
            alert("Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("categoryName", categoryName);
        if (categoryImg) {
            formData.append("category", categoryImg); // Append the new image if it exists
        }
        formData.append("categorId", editcategory._id);

        try {
            setLoading(true);

            const response = await axios.post(`${backend_API}/category/updateCategory`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                alert("Category edited successfully!");
                fetchCategory();

                const modalCloseButton = document.querySelector("[data-bs-dismiss='modal']");
                if (modalCloseButton) modalCloseButton.click();

                setCategoryName("");
                setCategoryImg(null);
                setPreview(null);
                setError("");
            } else {
                setError(response.data.message || "Failed to update category. Please try again.");
            }

        } catch (error) {
            console.error("Error updating category:", error);
            setError("Failed to update category. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                alert("File is too large. Please choose a file less than 5MB.");
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                return;
            }

            // Clear existing preview
            if (preview && typeof preview === "string") {
                URL.revokeObjectURL(preview);
            }

            setCategoryImg(file);
            const newPreview = URL.createObjectURL(file);
            setPreview(newPreview); // Update preview with the new image
        }
    };

    useEffect(() => {
        return () => {
            if (preview && typeof preview === "string") {
                URL.revokeObjectURL(preview); // Clean up the preview URL
            }
        };
    }, [preview]);

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Edit Category</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="category-name" className="col-form-label">Category Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file-upload" className="col-form-label">Category Image:</label>
                        <label htmlFor="file-upload" className="btn d-inline-block border border-orange d-flex justify-content-start align-items-center">
                            Category Image
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        {preview && <img src={preview} alt="Preview" width="100" />}
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Updating..." : "Update Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;
