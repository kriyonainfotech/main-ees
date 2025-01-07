import React, { useState } from 'react';
import AdminNavbar from '../admincomponents/AdminNavbar';
import UserSideBar from '../components/UserSideBar';
import ProfileSidebar from '../components/ProfileSidebar';
import Reffrale from '../components/Team/Reffrale';
import ReferredBy from '../components/Team/ReferredBy';

const Team = () => {
  const [activeSection, setActiveSection] = useState('referral');

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <AdminNavbar />
      <UserSideBar />
      <ProfileSidebar />
      <div className="py-28">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 text-white d-md-none d-flex flex-wrap align-items-center justify-content-between">
                <div className="col-6 pe-1">
                  <div
                    className={`earning rounded-1  p-2 text-center ${
                      activeSection === 'referral' ? 'bg-green-100' : 'bg-green'
                    }`}
                    onClick={() => handleSectionClick('referral')}
                  >
                    <h4>Referral</h4>
                    
                  </div>
                </div>
                <div className="col-6 ps-1">
                  <div
                    className={`history rounded-1 bg-blue p-2 text-center ${
                      activeSection === 'referredBy' ? 'bg-blue' : 'bg-blue-100'
                    }`}
                    onClick={() => handleSectionClick('referredBy')}
                  >
                    <h4>ReferredBy</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" d-md-none" >
          <div className="container">
            <div className="row">
              <div className="col-12 d-flx ">
                {activeSection === 'referral' && <Reffrale />}
                {activeSection === 'referredBy' && <ReferredBy />}
              </div>
            </div>
          </div>
        </section>

        <section className="d-none d-md-flex">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex justify-content-between">
              <Reffrale />  
              <ReferredBy />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Team;
