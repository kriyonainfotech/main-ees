import React, { memo } from 'react';
import AdminNavbar from '../admincomponents/AdminNavbar';
import UserSideBar from '../components/UserSideBar';
import TotalWallete from '../components/Wallete/TotalWallete';
import ProfileSidebar from '../components/ProfileSidebar';

const Wallete = () => {
  return (
    <>
      {/* Navigation */}
      <AdminNavbar />
      <UserSideBar />
      <ProfileSidebar/>

      {/* Main Section */}
      <section className="mt-40">
        <div className="container">
          <div className="row">
            <div className="wallete text-white">
              {/* Mobile-Only Actions */}
              <div className="col-12 d-md-none d-flex flex-wrap align-items-center justify-content-between">
                <div className="col-6 pe-1">
                  <div className="earning rounded-1 bg-green p-2 text-center">
                    <h4>Earnings</h4>
                  </div>
                </div>
                <div className="col-6 ps-1">
                  <div className="history rounded-1 bg-blue p-2 text-center">
                    <h4>History</h4>
                  </div>
                </div>
              </div>

              {/* Wallet Overview */}
              <div className="col-12 mt-3 d-flex flex-wrap p-4 rounded-1 bg-blue align-items-center">
                <TotalWallete />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Wallete);
