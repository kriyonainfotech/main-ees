import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function UserDropdown() {
   const { user } = useContext(UserContext);

   // Fallback image if user doesn't have a profile pic
   const profilePic = user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png";

  return (
    <>
      <div className="dropdown dropstart m-3 w-[60px] h-[60px] rounded-full overflow-hidden">
        <button
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          aria-label="User Profile"
          className="p-0 border-0 bg-transparent"
        >
          <div className="img w-full overflow-hidden">
            <img 
              src={profilePic} 
              alt={user?.name || "User Profile"} 
              className="w-full h-full img-fluid"
            />
          </div>
        </button>
      </div>
    </>
  );
}

export default UserDropdown;
