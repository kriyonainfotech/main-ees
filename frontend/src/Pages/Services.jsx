import React, { useState } from 'react'
import UserSideBar from '../components/UserSideBar'
import SearchScreen from './SearchScreen '
import AdminNavbar from '../admincomponents/AdminNavbar'

const Services = () => {


  return (
    <>
    
        <AdminNavbar />
        <UserSideBar />


        <div className='mt-32'>

          <SearchScreen />
         
        </div>

    </>
  )
}

export default Services
