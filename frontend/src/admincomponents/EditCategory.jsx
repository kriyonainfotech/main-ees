import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backend_API = import.meta.env.VITE_API_URL;

const EditCategory = ({ editcategory }) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryImg, setCategoryImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);  // To manage loading state
    const [error, setError] = useState("");         // To manage error state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName || !categoryImg) {
            alert("Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("category", categoryImg);

        try {
            setLoading(true);  // Start loading

            const response = await axios.post(`${backend_API}/category/updateCategory`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response.data);
            alert("Category edited successfully!");

            // Reset form fields after success
            setCategoryName("");
            setCategoryImg(null);
            setPreview(null);
            setError(""); // Clear error if any

        } catch (error) {
            console.error("Error editing category:", error);
            setError("Failed to update category. Please try again."); // Set error message
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        if (editcategory) {
            setCategoryName(editcategory.categoryName);
            setCategoryImg(editcategory.categoryImg || null);
            if (editcategory.categoryImg) {
                setPreview(editcategory.categoryImg);
            }
        }
    }, [editcategory]);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview); // Clean up the preview URL when component unmounts
            }
        };
    }, [preview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit for images
                alert("File is too large. Please choose a file less than 5MB.");
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                return;
            }

            setCategoryImg(file);
            const newPreview = URL.createObjectURL(file);
            setPreview(newPreview);
        }
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Category</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="category-name" className="col-form-label">Category Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            id="category-name"
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
                            name="categoryImg"
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
