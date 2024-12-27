import React, { useContext, useEffect, useState } from 'react'
import { FaCalendar, FaNetworkWired, FaPowerOff, FaUser, FaWallet } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GetAdmin from './GetAdmin'
import Logout from './Logout'
import { UserContext } from '../UserContext'

const backend_API = import.meta.env.VITE_API_URL;

const UserSideBar = () => {
   const { user } = useContext(UserContext);
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'))

  // console.log(token, "token profil");
  const sidebarManu = [
    {
      id: 1,
      title: 'profile',
      icon: <FaUser />,
      path: '/profile',
    },
    {
      id: 2,
      title: 'Card',
      icon: <FaCalendar />,
      path: '/',
    },
    {
      id: 4,
      title: 'wallete',
      icon: <FaWallet />,
      path: '/wallete',
    }

  ]
  return (
    <>
      <div className="offcanvas bg-white offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="d-flex  align-items-center p-3">

          <div className='w-full d-flex align-items-center gap-4'>
            <div class="img w-[80px] h-[80px] rounded-lg border bg-red overflow-hidden d-flex">
              <img src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"} className='w-full h-full' />
            </div>
            <div>
              <h3>{user?.name}</h3>
            </div>
          </div>
          <div className=' d-flex justify-content-center'>
            <button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close" />

          </div>
        </div>
        <hr />
        <div className="offcanvas-body p-0 p-2">
          <div>
            <ul classname="">
              {
                sidebarManu.map((manu, i) => {
                  return (
                    <li key={++i} className=' w-100  p-2 rounded hover:bg-orange hover:text-white focus:text-white'>
                      <Link to={manu.path} className='w-100 text-lg d-flex justify-content-center  justify-content-lg-start align-items-center '>
                        <span className='inline-block mr-2 text-xl'>{manu.icon}</span>
                        {manu.title}</Link>
                    </li>
                  )
                })
              }
              {/* <GetAdmin/> */}
              <Logout/>
              
            </ul>
          </div>
        </div>
      </div>


    </>
  )
}

export default UserSideBar
