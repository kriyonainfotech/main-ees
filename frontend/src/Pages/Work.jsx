import React, { useEffect, useState, useCallback } from 'react';
import AdminNavbar from '../admincomponents/AdminNavbar';
import UserSideBar from '../components/UserSideBar';
import Recievedrequest from '../components/Recievedrequest';
import Senedrequest from '../components/Senedrequest';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProfileSidebar from '../components/ProfileSidebar';

const backend_API = import.meta.env.VITE_API_URL;

const Work = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [recievedRequest, setRecievedRequest] = useState([]);
  const [sendedRequest, setSendedRequest] = useState([]);
  const [currentRequest, setCurrentRequest] = useState('Received Request'); // Default view
  const [isReceiverAvailable, setIsReceiverAvailable] = useState(true);

  const requests = [
    { id: 1, name: 'Sended Request' },
    { id: 2, name: 'Received Request' },
  ];

  // Fetch requests
  const fetchUserRequests = useCallback(async () => {
    try {
      const response = await axios.get(`${backend_API}/request/getUserRequests`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { receivedRequests, sendedRequests } = response.data;
        setRecievedRequest(receivedRequests || []);
        setSendedRequest(sendedRequests || []);
      } else {
        console.error('Failed to fetch requests:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user requests:', error);
      alert('Failed to fetch user requests. Please try again.');
    }
  }, [token]);

  useEffect(() => {
    fetchUserRequests();
  }, [fetchUserRequests]);

  return (
    <>
      {/* Admin Navbar and Sidebar */}
      <AdminNavbar />
      <UserSideBar />
      <ProfileSidebar/>

      <div className="my-32">
        {/* Request Tabs */}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex gap-3">
                {requests.map((req) => (
                  <div key={req.id} className="receivReqBtn">
                    <Link
                      className={`btn rounded-0 text-white ${currentRequest === req.name ? 'btn-success' : 'bg-green-100'}`}
                      onClick={() => setCurrentRequest(req.name)}
                    >
                      {req.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Request Content */}
        <div className="mt-4">
          {currentRequest === 'Received Request' ? (
            <Recievedrequest
              recievedRequest={recievedRequest}
              isReceiverAvailable={isReceiverAvailable}
              setIsReceiverAvailable={setIsReceiverAvailable}
            />
          ) : (
            <Senedrequest
              sendedRequest={sendedRequest}
              setSendedRequest={setSendedRequest}
              isReceiverAvailable={isReceiverAvailable}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Work;
