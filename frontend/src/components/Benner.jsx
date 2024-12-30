import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import "../assets/Banner/Banner.css";
import axios from 'axios';
import OfferModal from './OfferModal';

const backend_API = import.meta.env.VITE_API_URL;

const Benner = ({ BannerImage, setBannerImage }) => {
     
    const token = JSON.parse(localStorage.getItem('token'))
    const [BannerUser, setBannerUser] = useState([])
       
  // Function to fetch banners from the API
  const GetBanner = async () => {
    try {
      const response = await axios.get(`${backend_API}/banner/getAllBanners`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.data;
        // console.log("Fetched banners:", data);
        setBannerImage(data.banners); // Update BannerImage state with fetched banners
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };
  // Fetch banners on component mount
  useEffect(() => {
    GetBanner();
  }, []);

  const henleClick =async(bannerId) =>{
    alert(bannerId)
    try {
      const response = await axios.get(`${backend_API}/banner/getUserByBanner/${bannerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
        const data = await response.data;
        console.log(data.user, "banners uuuuuu");
        setBannerUser(data)
       
        if (response.status === 200) {
            console.log(data, "data Modal banner");
        }
    } catch (error) {
        console.log(error);
    }
  }
  return ( <>
 
    <section className="px-3 py-5">
     <div className="container">
     <div className="slider-container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true} // Infinite loop
          slideToClickedSlide={true} // Center the clicked slide
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={'auto'}
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
          modules={[EffectCoverflow, Navigation]}
        >
          {BannerImage.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.imageUrl}
                alt={image.alt || `Slide ${index + 1}`}
                onClick={() => henleClick(image._id)} 
                data-bs-toggle="modal" data-bs-target="#exampleModal"
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
     </div>
    </section>
    <OfferModal BannerUser={BannerUser}/>
    </>
  );
};

export default Benner;
