import React, { useEffect, useState } from 'react'
import AdminHeader from '../admincomponents/AdminHeader'
import AdminSidebar from '../admincomponents/AdminSidebar'
import axios from 'axios';
import EditCategory from '../admincomponents/EditCategory';
const backend_API = import.meta.env.VITE_API_URL;

const ManageCatagory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryImg, setCategoryImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [editcategory, setEditCategory] = useState({});
  
    // Handle form submission for adding category
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
            const response = await axios.post(`${backend_API}/category/addCategory`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            alert("Category added successfully");
            fetchCategory(); // Refresh category list

            // Close the modal after successful submission
            const modalCloseButton = document.querySelector("[data-bs-dismiss='modal']");
            if (modalCloseButton) {
                modalCloseButton.click(); // Close modal
            }

            // Clear form
            setCategoryName("");
            setCategoryImg(null);
            setPreview(null);
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Failed to add category. Check console for more details.");
        }
    };

    // Fetch categories from the backend
    const fetchCategory = async () => {
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

    useEffect(() => {
        fetchCategory();
    }, []);

    // Handle category deletion
    const hendeelDelete = async (categorId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const response = await axios.delete(`${backend_API}/category/deleteCategory`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: { categorId },
                });
                console.log(response.data);
                alert("Category deleted successfully");
                fetchCategory(); // Refresh the category list
            } catch (error) {
                console.error("Error deleting category:", error);
                alert("Failed to delete category. Check console for more details.");
            }
        }
    };

    // Handle category edit
    const hendelEdit = (categorysingle) => {
        setEditCategory(categorysingle);
    };

    // Handle file input changes and validate the selected file type
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setCategoryImg(file);
            setPreview(URL.createObjectURL(file));
        } else {
            alert("Please select a valid image file.");
        }
    };

    return (
        <>
            <AdminHeader />
            <AdminSidebar />
            <section className='mt-32'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h4>Manage Category</h4>
                                    <button className="btn bg-blue text-white" data-bs-toggle="modal" data-bs-target="#exampleModalE">Add Category</button>
                                </div>

                                {/* Add Category Modal */}
                                <div className="modal fade" id="exampleModalE" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Category</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                    <div className="mb-3">
                                                        <label htmlFor="category-name" className="col-form-label">Category Name:</label>
                                                        <input type="text" className="form-control" placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="category-img" className="col-form-label">Category Image:</label>
                                                        <label htmlFor="file-upload" className="btn d-inline-block border border-orange d-flex justify-content-start align-items-center">
                                                            Category Image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="file-upload"
                                                            name="categoryImg"
                                                            onChange={handleFileChange}
                                                        />
                                                        {preview && <img src={preview} alt="Preview" width="100" />}
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Add</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Category Table */}
                                <div className="card-body overflow-x-auto">
                                    <table className="table text-capitalize table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Category Name</th>
                                                <th>Category Image</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((category, index) => (
                                                <tr key={category._id} className='text-capitalize'>
                                                    <td>{index + 1}</td>
                                                    <td>{category.categoryName}</td>
                                                    <td><img src={category.image} alt="Category" width={70} /></td>
                                                    <td className='d-flex gap-2 justify-content-center'>
                                                        <button className="btn bg-green text-white" onClick={() => hendelEdit(category)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                                        <button className="btn bg-orange text-white ms-2" onClick={() => hendeelDelete(category._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Edit Category Modal */}
                                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <EditCategory editcategory={editcategory} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ManageCatagory;
