import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserAltSlash } from 'react-icons/fa'
import { Link, Navigate } from 'react-router-dom'

const backend_API = import.meta.env.VITE_API_URL;

const GetAdmin = () => {
    return (
        <>
                <li className=' p-2 rounded hover:bg-primary hover:text-white focus:text-white '>
                    <Link to={'/admin'} className=' text-lg d-flex justify-content-center justify-content-lg-start align-items-center'>
                        <span className='inline-block mr-2 text-xl '><FaUserAltSlash /></span>
                        Admin</Link>
                </li>
        </>
    )
}

export default GetAdmin
