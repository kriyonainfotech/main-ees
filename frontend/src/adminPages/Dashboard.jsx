import React, { useEffect, useState } from 'react'
import AdminHeader from '../admincomponents/AdminHeader'
import AdminSidebar from '../admincomponents/AdminSidebar'
import UserCount from '../admincomponents/dashboardCpmponent/UserCount'
import axios from 'axios';

const backend_API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
 const [Users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get(`${backend_API}/auth/getAllUser`, {
            headers: {
              'Content-Type': 'application/json',
    
            },
    
          });
          const data = await response.data;
          setUsers(data.user)
          console.log(data, "AllUser");
          if (response.status === 200) {
    
            console.log("All User Successful...");
          }
        } catch (error) {
          console.log(error);
          return false;
        }
    
      }
    
      useEffect(() => {
        fetchData()
      }, [])
  return (
    <>
    <AdminHeader/>
    <AdminSidebar/> 
    {/* <div className="section mt-28">
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 d-flex p-0">
            <div className="d-none d-md-flex col-12 col-md-2 fixed">
              <div className="side-bar w-100 h-[100vh]  bg-orange p-3">
<h1>sidebar</h1>
              </div>
            </div>
            <div className="col-12 col-md-10 md:px-56">
                 <div className="dashboard p-3">
                 <h3 className="">Dashboard</h3>
                <div className="col-12 d-flex flex-wrap pt-3">
                   <div className="col-12 col-md-6 col-lg-3">
                   <UserCount Users ={Users}/>
                   
                   </div>
                </div>
                 </div>
            </div>
          </div>

        </div>
      </div>
    </div> */}
    <section className='mt-32'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="">Dashboard</h3>
                </div>
                <div className="col-12 d-flex flex-wrap pt-3">
                   <div className="col-12 col-md-6 col-lg-3">
                   <UserCount Users ={Users}/>
                   
                   </div>
                </div>
            </div>
        </div>
    </section>
  
    </>
  )
}

export default Dashboard
