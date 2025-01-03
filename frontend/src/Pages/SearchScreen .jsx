import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backend_API = import.meta.env.VITE_API_URL;

const SearchScreen = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from API with useCallback to prevent re-fetching
  const fetchCategory = useCallback(async () => {
    try {
      const response = await axios.get(`${backend_API}/category/getAllCategory`);
      const sortedCategories = response.data.category.sort((a, b) =>
        a.categoryName.localeCompare(b.categoryName)
      );
      setCategories(sortedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // Run fetchCategory once on mount
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  // Efficiently check for auth state based on token
  const auth = Boolean(token);

  return (
    <section>
      <div className="container bd-orange">
        <div className="row row-cols-3 row-cols-lg-5 overflow-hidden">
          {
            categories.map((category) => (
              <div
                key={category.categoryName} // Use a unique key (categoryName or id if available)
                className="col"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/serviceDetail`, { state: category.categoryName })}
              >
                <div className="border-0 w-100 h-100 text-center items-center rounded-md">
                  <figure className='w-full m-0 p-2'>
                    <img
                      className='img-fluid w-100 border-orange rounded-4 p-1 overflow-hidden'
                      style={{ objectFit: "cover" }}
                      src={category.image}
                      alt={category.categoryName} // Adding alt attribute for better accessibility
                    />
                  </figure>
                  <h6 className='text-md text-capitalize'>{category.categoryName}</h6>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}

export default SearchScreen;
