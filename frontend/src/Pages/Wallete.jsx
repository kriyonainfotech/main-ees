import React from 'react'
import AdminNavbar from '../admincomponents/AdminNavbar'
import UserSideBar from '../components/UserSideBar'
import TotalWallete from '../components/Wallete/TotalWallete'
import WalletList from '../components/Wallete/WalletList'

const Wallete = () => {
  return (
    <>
    <AdminNavbar/>
    <UserSideBar/>
   <section className='mt-40'>
    <div className="container">
      <div className="row">
        <div className="wallete text-white">
          <div className="col-12  d-flex flex-wrap align-items-center justify-content-between">
            <div className="col-6 d-md-none  pe-1">
              <div className="earning rounded-1 bg-green p-2 d-flex justify-content-center">
                <h4>Earnings</h4>
              </div>
            </div>
            <div className="col-6  d-md-none ps-1"> 
              <div className="history rounded-1 bg-blue d-flex justify-content-center p-2">
                <h4>History</h4>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3 d-flex flex-wrap p-4 rounded-1 bg-blue align-items-center">
          <TotalWallete/>
          </div>
          <div className="col-12 pt-3">
            <WalletList/>
          </div>
        </div>
      </div>
    </div>
   </section>
    </>
  )
}

export default Wallete