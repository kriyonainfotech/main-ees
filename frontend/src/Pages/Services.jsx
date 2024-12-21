import React, { useState } from 'react'
import UserSideBar from '../components/UserSideBar'
import SearchScreen from './SearchScreen '
import AdminNavbar from '../admincomponents/AdminNavbar'
import SearchResult from '../components/SearchResult'
import ServiceDetail from './ServiceDetail'

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
