import React from 'react'
import { FaStar } from 'react-icons/fa'

const OfferModal = ({ BannerUser }) => {
  // console.log(BannerUser,"banners");
  
  // Fallback image if BannerUser's profile image or BannerUser data is missing
  const profileImageUrl = BannerUser?.user?.profileImageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';
  const offerImageUrl = BannerUser?.banner?.imageUrl || ''; // Fallback image for banner

  // Dynamic ratings
  const userRating = BannerUser?.user?.rating || 0; // Example of dynamic rating for the user
  const providerRating = BannerUser?.banner?.providerRating || 0; // Example of dynamic rating for the provider

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={index < rating ? 'text-warning' : 'text-muted'} />
    ));
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    View Offer {BannerUser?.banner?.userId}
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="col-12">
                    <div className="modalImg h-[100px] img-fluid w-full">
                      <img src={offerImageUrl} className="h-full w-full" alt="Offer Banner" />
                    </div>
                    <div className="ModalContent pt-3 d-flex">
                      <div className="col-4">
                        <div className="img img-fluid w-[150px]">
                          <img src={profileImageUrl} alt="User Profile" className="w-full" />
                        </div>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="userContent px-3">
                          <h5>{BannerUser?.user?.name}</h5>
                          <div className="rateUser d-flex align-items-center gap-2">
                            <span>User</span>
                            <div className="rating rating-sm py-1 d-flex flex-wrap align-items-center justify-content-start">
                              {renderStars(userRating)}
                            </div>
                          </div>
                          <div className="rateUser d-flex align-items-center gap-2">
                            <span>Provider</span>
                            <div className="rating rating-sm py-1 d-flex flex-wrap align-items-center justify-content-start">
                              {renderStars(providerRating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn bg-green text-white">
                    Contact Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferModal;
