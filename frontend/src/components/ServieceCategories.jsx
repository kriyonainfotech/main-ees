import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServieceCategories = ({ categories }) => {
    const navigate = useNavigate();

    // Handle category click
    const handleCategoryClick = (categoryName) => {
        navigate('/serviceDetail', { state: categoryName });
    };

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-5">
                <h5>No categories available</h5>
            </div>
        );
    }

    return (
        <section className='mt-2'>
            <div className="container">
                <div className="row row-cols-3 row-cols-lg-5 overflow-hidden">
                    {categories.map((item, index) => (
                        <div key={index} className="col py-2" style={{ cursor: "pointer" }} onClick={() => handleCategoryClick(item.categoryName)}>
                            <div className="border-0 w-100 h-100 text-center rounded-md">
                                <figure className='w-full m-0 p-2'>
                                    <img className='img-fluid w-100 p-2 border-orange rounded-4 overflow-hidden' 
                                         style={{ objectFit: "cover" }} 
                                         src={item.image} 
                                         alt={item.categoryName} />
                                </figure>
                                <h6 className='text-md text-capitalize'>{item.categoryName}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServieceCategories;