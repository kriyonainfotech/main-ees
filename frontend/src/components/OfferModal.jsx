import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const OfferModal = ({ BannerUser, offerImage, closeModal }) => {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    if (Object.keys(BannerUser).length > 0) {
      setOffer(BannerUser);
    }
  }, [BannerUser]);

  const profileImageUrl = offer?.profilePic || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';
  const userRating = offer?.ratings?.length || 0;

  const renderStars = (rating) => {
    return Array.from({ length: 10 }, (_, index) => (
      <FaStar key={index} className={index < rating ? 'text-warning' : 'text-muted'} />
    ));
  };

  return (
    <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">View Offer</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            {offer ? (
              <div className="col-12">
                <div className="modalImg h-[250px]  w-full overflow-hidden">
                  <img src={offerImage} className="h-full w-full img-fluid" style={{objectFit:"contain", objectPosition:"center"}} alt="Offer Banner" />
                </div>
                <div className="ModalContent pt-3 d-flex">
                  <div className="col-4">
                    <div className="img w-[150px] h-[150px] overflow-hidden">
                      <img src={profileImageUrl} alt="User Profile" className="w-full h-full img-fluid " />
                    </div>
                  </div>
                  <div className="col-8 d-flex align-items-center">
                    <div className="userContent px-3">
                      <h5>{offer?.name}</h5>
                      <p className='py-2' >{offer?.email}</p>
                      <div className="rateUser d-flex flex-column  gap-2">
                        <p className='text-start'>User Rating :</p>
                        <div className="rating rating-sm py-1 d-flex flex-wrap align-items-center justify-content-start">
                          {renderStars(userRating)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
          <div className="modal-footer">
          <button type="button" className="btn bg-green text-white" onClick={closeModal}>
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
