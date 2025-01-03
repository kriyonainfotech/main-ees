import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiDotsHorizontal } from "react-icons/hi";
import Webcam from 'react-webcam';
import { LuUserPen } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { FaCamera, FaRegAddressCard } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import UserSideBar from './UserSideBar';
import AdminNavbar from '../admincomponents/AdminNavbar';
import { FiCamera } from 'react-icons/fi';
import { toast } from 'react-toastify';
const backend_API = import.meta.env.VITE_API_URL;
const EditProfile = () => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState();
  const [businessCategory, setBusinessCategory] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null); // Actual file object
  const [profilePicPreview, setProfilePicPreview] = useState(null); // Blob URL for preview
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false); // Webcam toggle
  const [webcamImage, setWebcamImage] = useState(null); // Captured image from webcam
  const webcamRef = useState(null);

  const location = useLocation();

  const navigete = useNavigate()
  const toggleSelection = (category) => {
    setBusinessCategory(category); // Set selected category
    setIsDropdownOpen(false); // Close dropdown
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const token = JSON.parse(localStorage.getItem('token'))

  const fetchLocationDetails = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      console.log(data);


      if (data[0].Status === 'Success') {
        const postOffice = data[0].PostOffice[0]; // Get the first result
        setArea(postOffice.Name || ''); // Set Area (e.g., Kamrej)
        setCity(postOffice.District || ''); // Set City (e.g., Surat)
        setState(postOffice.State || ''); // Set State (e.g., Gujarat)
        setCountry(postOffice.Country || ''); // Set Country (e.g., India)

      } else {
        setError('Invalid Pincode! Please enter a valid one.');
        setArea('');
        setCity('');
        setState('');
        setCountry('');
      }
    } catch (err) {
      setError('Failed to fetch location details. Try again later.');
    }
  };

  // Handle pincode input change
  const handlePincodeChange = (e) => {

    const inputPincode = e.target.value.trim();
    setPincode(inputPincode);

    if (inputPincode.length === 6) {
      fetchLocationDetails(inputPincode);
    } else {
      setArea('');
      setCity('');
      setState('');
      setCountry('');
      setError('');
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${backend_API}/category/getAllCategory`);
      const sortedCategories = response.data.category.sort((a, b) =>
        a.categoryName.localeCompare(b.categoryName)
      );

      setCategories(sortedCategories);
      // console.log(sortedCategories, "sortedCategories");
    }
    catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      console.log(blobUrl)
      setProfilePic(file); // Save the file object to send to the backend
      setProfilePicPreview(blobUrl);

    }
  };
  const toggleWebcam = () => {
    setIsWebcamOpen((prev) => !prev);
  };

  const captureWebcamImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamImage(imageSrc);
    setIsWebcamOpen(false);
    setProfilePicPreview(imageSrc);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAddress = {
      area,
      city,
      state,
      country,
      pincode
    };
    // const fullData = { name, email, phone, address: newAddress, businessCategory, businessName, businessAddress };
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', JSON.stringify({ area, city, state, country, pincode }));
    formData.append('businessCategory', businessCategory);
    formData.append('businessName', businessName);
    formData.append('businessAddress', businessAddress);
    // Add the actual file to FormData
    if (webcamImage) {
      const blob = await (await fetch(webcamImage)).blob();
      formData.append('image', blob);
    } else if (profilePic) {
      formData.append('image', profilePic);
    }
    try {
      const response = await axios.post(`${backend_API}/auth/updateProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.data;
      console.log(data.message, "adited data");
      setProfile(data)
      if (response.status === 200) {
        toast("Profile Updated Successfully");
        navigete('/profile')
      }

    } catch (error) {
      console.log(error);
      // console.log(response.data.message);

      return false;
    }


  };
  useEffect(() => {
    setName(location?.state?.name)
    setEmail(location?.state?.email)
    setPhone(location?.state?.phone)
    setArea(location?.state?.address?.area)
    setCity(location?.state?.address?.city)
    setState(location?.state?.address?.state)
    setCountry(location?.state?.address?.country)
    setPincode(location?.state?.address?.pincode)
    setAddress(location?.state?.address || {})
    setBusinessCategory(location?.state?.businessCategory || []),
      setBusinessName(location?.state?.businessName),
      setBusinessAddress(location?.state?.businessAddress)
    setProfilePic(location?.state?.profilePic)
  }, [location?.state])

  return (
    <>
      <AdminNavbar />
      <UserSideBar />
      <section className='py-28'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className='py-2'>Profile Setting</h2>
              <div className='card border-0 bg-base-100 shadow-xl'>
                <form action="" onSubmit={handleSubmit} className=' p-3'>

                  <div className='profilepic d-flex justify-content-between'>
                    <label
                      htmlFor="profilePictureInput"
                      className={`rounded-md m-3 cursor-pointer overflow-hidden ${isWebcamOpen ? 'disabled' : ''}`}
                      style={{ position: "relative",width:"150px",height:"150px",objectFit:"cover" ,objectPosition:"center" }}
                    >
                      <img
                        src={profilePicPreview || profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"}
                        alt="Profile"
                        className="rounded-md img-flied w-100"
                       
                      />
                    </label>

                    {/* Disable file input if webcam is open */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                      name="image"
                      id="profilePictureInput"
                      disabled={isWebcamOpen}
                    />

                    <button
                      type="button"
                      onClick={toggleWebcam}
                      className="position-absolute top-36 start-36 p-2 bg-white rounded-full mx-2"
                    >
                      <FiCamera />
                    </button>
                    <div className='d-flex d-md-none'>
                      <label
                        htmlFor="cameraInput"
                        className="position-absolute top-36 start-36 p-2 bg-white rounded-full mx-2 cursor-pointer"
                      >
                      <FiCamera />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        capture="camera"
                        id="cameraInput"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </div>


                    {/* Webcam component */}
                    {isWebcamOpen && (
                      <div className="webcam-overlay d-none d-md-flex">
                        <div className="webcam-popup">
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="webcam"
                          />
                          <button type="button" onClick={captureWebcamImage} className="btn btn-primary mt-2">
                            Capture
                          </button>
                          <button type="button" onClick={toggleWebcam} className="btn btn-secondary mt-2">
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='form-detaile d-flex flex-wrap w-full py-2 d-flex'>

                    <div className="col-12 col-md-6 p-2 w-full">
                      <div className='my-1'>
                        <label className="block text-md font-medium p-2 text-bold "> Name</label>
                        <label htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2'>
                          <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className=' w-100 outline-0 ' />
                          <LuUserPen className='text-xl' />
                        </label>
                      </div>
                      <div className='my-1'>
                        <label className="block text-md font-medium p-2 text-bold "> Email</label>
                        <label htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2'>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=' w-100 outline-0 ' />
                          <MdAlternateEmail className='text-xl' />
                        </label>
                      </div>
                      <div className='my-1'>
                        <label className="block text-md font-medium p-2 text-bold ">Contact </label>
                        <label htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2'>
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className=' w-100 outline-0 ' />
                          <LuPhone className='text-xl' />
                        </label>
                      </div>
                      <div className='my-1'>
                        <label className="block text-md font-medium p-2 text-bold ">Address</label>
                        <div className="col-12 d-flex flex-wrap">
                          <div className="col-6">
                            <div htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2 m-1'>
                              <input
                                type="text"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className=' w-100 outline-0 ' placeholder='area' />
                              <FaRegAddressCard className='text-xl' />
                            </div>
                          </div>
                          <div className="col-6">
                            <div htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2 m-1'>
                              <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className=' w-100 outline-0 ' placeholder='city' />
                              <FaRegAddressCard className='text-xl' />
                            </div>
                          </div>
                          <div className="col-6">
                            <div htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2 m-1'>
                              <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className=' w-100 outline-0 ' placeholder='state' />
                              <FaRegAddressCard className='text-xl' />
                            </div>
                          </div>
                          <div className="col-6">
                            <div htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2 my-1'>
                              <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className=' w-100 outline-0 ' placeholder='country' />
                              <FaRegAddressCard className='text-xl' />
                            </div>
                          </div>
                          <div className="col-6">
                            <div htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2 m-1'>
                              <input
                                type="text"
                                value={pincode}
                                onChange={handlePincodeChange}
                                maxLength="6"
                                className=' w-100 outline-0 bg-none' placeholder="pincode" />
                              <FaRegAddressCard className='text-xl' />
                            </div>

                          </div>

                        </div>

                      </div>
                    </div>
                    <div className="col-12 col-md-6 p-2 w-full">
                      <div className='my-1'>
                        <label className="block text-md font-medium p-2 text-bold ">Bussiness Name </label>
                        <label htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2'>
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className=' w-100 outline-0 ' />
                          <MdAlternateEmail className='text-xl' />
                        </label>
                      </div>
                      <div className='my-1'>
                        <label className="block text-md font-medium p-2 text-bold ">Bussiness Category</label>
                        <div className="">
                          {/* Display Selected Category */}
                          <div className="border border-2 text-capitalize rounded-md p-2 bg-white"
                            onClick={toggleDropdown}
                          >
                            {businessCategory.length > 0 ? (

                              <span className="inline-block px-3 text-black py-1  ">
                                {businessCategory}
                              </span>


                            ) : (
                              <span className="text-gray-500 ps-3 py-1">Select a category</span>
                            )}
                          </div>

                          {/* Dropdown Menu */}
                          {isDropdownOpen && (
                            <ul className="z-10 border border-gray-300 bg-white w-full mt-2 rounded-md  max-h-40 overflow-y-auto">
                              {categories.map((category, i) => (
                                <li
                                  key={i}
                                  className={`cursor-pointer px-4 py-2 text-capitalize hover:bg-green-200 ${businessCategory === category.categoryName ? "bg-green-200" : ""
                                    }`}
                                  onClick={() => toggleSelection(category.categoryName)}
                                >
                                  {category.categoryName}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className='my-2'>
                        <label className="block text-md font-medium p-2 text-bold ">Bussiness Address</label>
                        <label htmlFor="" className='d-flex align-items-center border border-2 rounded-md p-2 m-1'>
                          <input
                            type="text"
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                            className=' w-100 outline-0 ' />
                          <FaRegAddressCard className='text-xl' />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <button
                      type="submit"
                      className="d-flex justify-content-center bg-orange text-white px-4  py-3 px-2 rounded-md hover:bg-primary "
                    > Update <CiEdit className='text-xl text-bold mx-2' />

                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;