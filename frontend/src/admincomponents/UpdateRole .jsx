import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const backend_API = import.meta.env.VITE_API_URL;

const UpdateRole = () => {
    const [email, setEmail] = useState('');
    const [newRole, setNewRole] = useState('User');
    const [error, setError] = useState(null);

    const handleUpdateRole = async () => {
        try {
            const response = await axios.put(`${backend_API}/auth/updateRoleByEmail`, {
                email: email,
                role: newRole,
            });

            if (response.status === 200) {
                toast("User role updated successfully")
                console.log('User role updated successfully');
                setError(null); // Clear any previous errors
            }
        } catch (error) {
            if (error.response) {
                // Handle error from backend
                setError(error.response.data.message || 'Something went wrong');
            } else {
                // Handle error (e.g., network error)
                setError('Network error or timeout');
            }
        }
    };

    return (
        <>

            <section>
                <div className="container mt-5">
                    <div className="row ">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Update User Role</h4>

                                    <div className='d-flex gap-3'>
                                        {/* Email Input */}
                                        <div className="">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="Enter Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        {/* Role Selection */}
                                        <div className="">
                                            <label htmlFor="role" className="form-label">Select Role</label>
                                            <select
                                                id="role"
                                                className="form-select"
                                                value={newRole}
                                                onChange={(e) => setNewRole(e.target.value)}
                                            >
                                                <option value="Admin">Admin</option>
                                                <option value="User">User</option>
                                            </select>
                                        </div>



                                    </div>
                                    {/* Error Message */}
                                    {error && <p className="text-danger">{error}</p>}

                                    {/* Update Button */}
                                    <button className="btn bg-blue text-white mt-3" onClick={handleUpdateRole}>
                                        Update Role
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default UpdateRole;
