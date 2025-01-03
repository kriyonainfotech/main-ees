import React, { useState } from 'react'
import UserSideBar from '../components/UserSideBar'
import SearchScreen from './SearchScreen '
import AdminNavbar from '../admincomponents/AdminNavbar'
import ProfileSidebar from '../components/ProfileSidebar';

const Services = () => {


  return (
    <>
    
        <AdminNavbar />
        <UserSideBar />
        <ProfileSidebar />
        <div className='my-32'>
          <SearchScreen />
         
        </div>

    </>
  )
}

export default Services
