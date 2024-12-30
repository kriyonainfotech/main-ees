import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function UserDropdown() {
   const { user } = useContext(UserContext);

  return (
    <>
      <div className="dropdown dropstart rounded-lg m-3 border bg-red">
        <div  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <div class="img w-[60px] h-[50px] rounded-lg border bg-red overflow-hidden">
            <img src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"} className='w-full h-full' />
          </div>
        </div>
       
      </div>
      
     
      
    </>
  );
}

export default UserDropdown;
