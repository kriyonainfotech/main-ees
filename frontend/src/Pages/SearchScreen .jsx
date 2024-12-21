import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navebar from '../components/Navebar';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaLocationArrow, FaLocationDot, FaPhone, FaServer } from 'react-icons/fa6';
import { FaRegAddressCard, FaSearch, FaStar } from 'react-icons/fa';
import UserSideBar from '../components/UserSideBar';
import axios from 'axios';
import ServiceDetail from './ServiceDetail';
import SearchResult from '../components/SearchResult';
import SearchBox from '../components/SearchBox';

const backend_API = import.meta.env.VITE_API_URL; 

// const backend_API = "https://ees-121-backend.vercel.app"

const SearchScreen = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const loginData = JSON.parse(localStorage.getItem("Users"))
    console.log(loginData,"LoginData");
    const [categories, setCategories] = useState([]);
    const [auth, setAuth] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([])
    
    const [selectedItem, setSelectedItem] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);

    const [loginUser,setLoginUser] = useState([])

    const [categoryFilter, setCategoryFilter] = useState("");
   
    const fetchData = async () => {
        try {
            const response = await axios.get(`${backend_API}/auth/getAllUser`);
            const data = response.data.user;
            console.log(data);
            setSearchResult(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${backend_API}/category/getAllCategory`);
            const sortedCategories = response.data.category.sort((a, b) =>
                a.categoryName.localeCompare(b.categoryName)
            );

            setCategories(sortedCategories);
            console.log(sortedCategories, "sortedCategories");
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchCategory()
    }, []);
    const handleItemCaregory = (cat) => {
        console.log(cat);
   
        let filteredCategory = [...selectedItem]

        filteredCategory = filteredCategory.filter((user) =>
            user.businessCategory.some((category) =>
                category == cat)
        )
        // console.log(filteredCategory);

        setSelectedItem(filteredCategory);
    }

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        setShowList(!!value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value.toLowerCase();
        setCategoryFilter(value);

        const filtered = selectedItem.filter((user) => {
            // Safely access the address fields
            const area = user.address?.area?.toLowerCase() || "";
            const city = user.address?.city?.toLowerCase() || "";
            const state = user.address?.state?.toLowerCase() || "";
            const country = user.address?.country?.toLowerCase() || "";
            const pincode = user.address?.pincode?.toLowerCase() || "";

            // Check if the input value matches any address field
            return (
                area.includes(value) ||
                city.includes(value) ||
                state.includes(value) ||
                country.includes(value) ||
                pincode.includes(value)
            );
        });
        setFilteredItem(filtered);
    };

    const handleItemClick = (cat) => {
        setSearch(cat); // Update the search box with the selected value
        // setShowList(false);
       
         // Hide the list
        let filtercat = [...searchResult]
        if (cat) {
            filtercat = filtercat.filter((user) =>
                {
                    // Check if the user's businessCategory matches the selected category
                    const categoryMatch = user.businessCategory.some((category) => category === cat);
        
                    // Check if the user's address matches the logged-in user's address
                    let loginAddress = loginData?.address?.city || ""; // Assuming 'loggedInUser' contains the logged-in user's data
                    console.log(loginAddress,"datasss");
                    const addressMatch = user.address?.city === loginAddress;
        
                    return categoryMatch && addressMatch; // Both conditions must be true
                });
            }
        setSelectedItem(filtercat);
        setFilteredItem(filtercat); // Initially set filteredItem as the same

    };

    useEffect(() => {
        if (token) {
            setAuth(true)
        } else {
            setAuth(false)
        }


    }, [token])

    if (selectedItem) {
        console.log(selectedItem, "selectedItem");
    }
    console.log(filteredItem);

    return (
        <>
            <section>
                <div className="container bd-orange">
                        <div className="row row-cols-3 row-cols-lg-5 overflow-hidden">
                            {
                                categories.map((user, i) => (
                                    <div key={++i} className="col" style={{ cursor: "pointer" }} onClick={() => navigate(`/serviceDetail`, { state: user.categoryName })}>
                                        <div className="border-0 w-100 h-100  text-center items-center rounded-md ">
                                            <figure className='w-full m-0 p-2 '>
                                                <img className='img-fluid w-100 border-orange rounded-4 p-1 overflow-hidden ' style={{ objectFit: "cover" }} src={user.image} >
                                                </img>
                                            </figure>
                                            <h6 className='text-md text-capitalize'>{user.categoryName}</h6 >
                                        </div>


                                    </div>
                                ))}
                        </div>
                </div>
            </section>
            {/* <ServiceDetail selectedItem ={selectedItem} handleItemCaregory = {handleItemCaregory} /> */}

            <section>
                <div className="container">
                    <div className="row">

                        {/* <div className="col-12 flex flex-wrap">
                            {
                                filteredItem.length > 0 ? (
                                    filteredItem.map((user, i) => (
                                        <SearchResult key={i} user={user} token={token} handleItemCaregory={handleItemCaregory} />
                                    ))
                                ) : (
                                    <h4>No item Found</h4>
                                )
                            }


                        </div> */}
                        {/* <div className="col-12 flex flex-wrap">
                            {
                                filteredItem.length > 0 ? (
                                    filteredItem.map((user, i) => {
                                        return (
                                            <div key={i} className="col-12 col-md-6 col-xl-3 p-2" onClick={() => handleItemCaregory(user.businessCategory)} style={{ cursor: "pointer" }}>
                                                <div className="card  border bg-base-100 hover:shadow-xl  w-full h-100 box" >
                                                    <div className='d-flex justify-content-between'>
                                                        <figure className='rounded-md m-3'>
                                                            <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" >

                                                            </img>
                                                        </figure>
                                                        <span className='bg-white rounded-full m-2 shadow-xl w-[30px] h-[30px] d-flex align-items-center justify-content-center '><HiDotsHorizontal /></span>
                                                    </div>
                                                    <div className='p-3'>
                                                        <h4 className=" font-bold">{user.name}</h4>
                                                        <h5 className=" font-bold py-2">{user.businessCategory}</h5>
                                                        <h6 className=" font-bold text-gray">{user.address.city}</h6>

                                                        <p className="text-sm text text-gray-600 py-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, laborum. amet consectetur adipisicing elit. Sit, laborum</p>
                                                        <div className="rating rating-sm py-2 d-flex align-items-center">
                                                            <FaStar className='text-warning' />
                                                            <FaStar className='text-warning' />
                                                            <FaStar className='text-warning' />
                                                            <FaStar className='text-warning' />
                                                            <FaStar className='text-warning' /> <span className='ps-2'>rating</span>
                                                        </div>

                                                        <div className='d-flex justify-end'>
                                                            <Link onClick={() => sendRequest(user._id)} className='btn p-0  pt-2 gap-2  d-flex align-items-center  rounded-1 text-semibold text-success '>
                                                                <FaPhone /> Contect Now
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })
                                ) : (
                                    <h4>No item Found</h4>
                                )
                            }


                        </div> */}
                    </div>
                </div>
            </section>


        </>
    )
}

export default SearchScreen 
