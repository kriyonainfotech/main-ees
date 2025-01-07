import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./UserContext";
import { FCMProvider } from "./context/FCMContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectAdmin from "./components/ProtectAdmin";
import Notification from "./components/Notification";
import Loader from "./components/Loader";

// Lazy-loaded components
const Login = lazy(() => import("./components/Login"));
const Registration = lazy(() => import("./components/Registration"));
const Profile = lazy(() => import("./Pages/Profile"));
const EditProfile = lazy(() => import("./components/EditProfile"));
const Admin = lazy(() => import("./Pages/Admin"));
const EditUser = lazy(() => import("./admincomponents/EditUser"));
const ServiceDetail = lazy(() => import("./Pages/ServiceDetail"));
const Services = lazy(() => import("./Pages/Services"));
const RegisterNextPage = lazy(() => import("./components/RegisterNextPage"));
const Work = lazy(() => import("./Pages/Work"));
const Senedrequest = lazy(() => import("./components/Senedrequest"));
const Home = lazy(() => import("./Pages/Home"));
const AllUsers = lazy(() => import("./adminPages/AllUsers"));
const ManageCatagory = lazy(() => import("./adminPages/ManageCatagory"));
const Dashboard = lazy(() => import("./adminPages/Dashboard"));
const Wallete = lazy(() => import("./Pages/Wallete"));
const Team = lazy(() => import("./Pages/Team"));
const ManageAdmin = lazy(() => import("./adminPages/ManageAdmin"));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <UserProvider>
      <ToastContainer />
      <FCMProvider>
        <Suspense fallback={
          <>
          <Loader />
          </>
          }>
          <Router>
            <Routes>
              <Route path="/register" element={<Registration />} />
              <Route path="/registernext" element={<RegisterNextPage />} />
              <Route path="/login" element={<Login />} />
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/serviceDetail" element={<ServiceDetail />} />
                <Route path="/work" element={<Work />} />
              </Route>
              <Route path="/" element={<Home />} />
              <Route path="/servises" element={<Services />} />
              {/* Work */}
              <Route path="/work/sendrequest" element={<Senedrequest />} />
              <Route path="/wallete" element={<Wallete />} />
              <Route path="/team" element={<Team />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectAdmin><Dashboard /></ProtectAdmin>} />
              <Route path="/admin/users" element={<ProtectAdmin><AllUsers /></ProtectAdmin>} />
              <Route path="/admin/editUser" element={<ProtectAdmin><EditUser /></ProtectAdmin>} />
              <Route path="/admin/manageAdmin" element={<ProtectAdmin><ManageAdmin /></ProtectAdmin>} />
              <Route path="/admin/manageCategory" element={<ProtectAdmin><ManageCatagory /></ProtectAdmin>} />
            </Routes>
          </Router>
        </Suspense>
      </FCMProvider>
      <Notification />
    </UserProvider>
  );
}
