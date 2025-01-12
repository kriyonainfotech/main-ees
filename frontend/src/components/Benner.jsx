import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import "../assets/Banner/Banner.css";
import axios from 'axios';
import OfferModal from './OfferModal';

const backend_API = import.meta.env.VITE_API_URL;

const Banner = ({ BannerImage, setBannerImage }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const [BannerUser, setBannerUser] = useState({});
    const [offerImage, setOfferImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility

    const GetBanner = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${backend_API}/banner/getAllBanners`, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                setBannerImage(response.data.banners);
            }
        } catch (err) {
            setError("Failed to fetch banners. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleOfferBanner = async (bannerId,imageUrl) => {
       
        try {
            const response = await axios.get(`${backend_API}/banner/getUserByBanner/${bannerId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setBannerUser(response.data.user);
                setOfferImage(imageUrl)
                setIsModalOpen(true); // Open the modal after fetching user data
            }
        } catch (error) {
            console.error("Error fetching banner user data:", error);
        }
    };

    useEffect(() => {
        GetBanner();
    }, []);

    return (
        <section className="py-5">
            <div className="container">
                {loading ? (
                    <p>Loading banners...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="slider-container">
                        <Swiper
                            effect="coverflow"
                            grabCursor
                            centeredSlides
                            loop={BannerImage.length > 3}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            slidesPerView="auto"
                            breakpoints={{
                                320: { slidesPerView: 3, spaceBetween: -30 },
                                640: { slidesPerView: 3, spaceBetween: 30 },
                                768: { slidesPerView: 3, spaceBetween: -30 },
                                1024: { slidesPerView: 5, spaceBetween: -30 },
                            }}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: -55,
                                depth: 150,
                                modifier: 1.2,
                                slideShadows: false,
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                                clickable: true,
                            }}
                            modules={[EffectCoverflow, Navigation, Autoplay]}
                        >
                            {BannerImage.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image.imageUrl}
                                        alt={`Slide ${index + 1}`}
                                        onClick={() => handleOfferBanner(image._id,image.imageUrl)}
                                    />
                                </SwiperSlide>
                            ))}
                            <div className="slider-controler">
                                <div className="swiper-button-prev">
                                    <ArrowLeft size={20} />
                                </div>
                                <div className="swiper-button-next">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </Swiper>
                    </div>
                )}
            </div>

            {/* Conditionally render the modal */}
            {isModalOpen && <OfferModal BannerUser={BannerUser} offerImage={offerImage} closeModal={() => setIsModalOpen(false)} />}
        </section>
    );
};

export default Banner;
