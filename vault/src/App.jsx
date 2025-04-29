// import React from 'react';
// import { Routes, Route, Outlet, useLocation } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Home from "./Page/Home";
// import LoginForm from "./Page/LoginForm";
// import SignupForm from "./Page/SignupForm";
// import ForgotPassword from "./Page/ForgotPassword";
// import NewCars from "./Page/NewCars";
// import ViewDetails from "./Page/ViewDetails";
// import Footer from "./Components/Footer";
// import UsedCars from "./Page/UsedCars";
// import VerifyOTP from "./Page/VerifyOTP";
// import NewPassword from "./Page/NewPassword";
// import CompareModel from "./Page/CompareModal";
// import Accessory from "./Page/Accessory";
// import Dashboard from "./Page/Dashboard";
// import TestDriveBooking from "./Page/TestDriveBooking";
// import ContactSeller from "./Page/ContactSeller";
// import Wishlist from "./Page/Wishlist";
// import AdminDashboard from "./Admin/Dashboard";
// import AdminCars from "./Admin/Cars";
// import AdminAccessories from "./Admin/Accessories";
// import AdminSidebar from "./Admin/Sidebar";
// import Cars from './Admin/Cars';

// const Layout = () => {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith('/admin');
//   const hideNavbar = ["/login", "/signup", "/forgotpassword", "/admin", "/admin/login", "/reset-password", "/verify-otp"].includes(location.pathname);
//   const hideFooter = hideNavbar || isAdminRoute;
  
//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       {isAdminRoute ? (
//         <div className="flex h-screen bg-gray-100">
//           <AdminSidebar />
//           <div className="flex-1 overflow-auto">
//             <div className="container mx-auto px-6 py-8">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Outlet />
//       )}
//       {!hideFooter && <Footer />}
//     </>
//   );
// };

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="signup" element={<SignupForm />} />
//         <Route path="forgotpassword" element={<ForgotPassword />} />
//         <Route path="newcars" element={<NewCars />} />
//         <Route path="/cars/:id" element={<ViewDetails />} />
//         <Route path="footer" element={<Footer />} />
//         <Route path="usedcars" element={<UsedCars/>} />
//         <Route path="/verify-otp" element={<VerifyOTP />} />
//         <Route path="/reset-password" element={<NewPassword />} />
//         <Route path="accessory" element={<Accessory/>} />
//         <Route path="comparemodel" element={<CompareModel />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="wishlist" element={<Wishlist />} />
//         <Route path="testdrive" element={<TestDriveBooking />} />
//         <Route path="contactseller" element={<ContactSeller />} />

//         {/* Add the Cars route */}
//         <Route path="cars" element={<Cars />} /> {/* New Route */}
        
//         {/* Admin Routes */}
//         <Route path="admin" element={<AdminDashboard />} />
//         <Route path="admin/cars" element={<AdminCars />} />
//         <Route path="admin/accessories" element={<AdminAccessories />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;



import React from 'react';
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Public Pages
import Home from "./Page/Home";
import LoginForm from "./Page/LoginForm";
import SignupForm from "./Page/SignupForm";
import ForgotPassword from "./Page/ForgotPassword";
import NewCars from "./Page/NewCars";
import ViewDetails from "./Page/ViewDetails";
import UsedCars from "./Page/UsedCars";
import VerifyOTP from "./Page/VerifyOTP";
import NewPassword from "./Page/NewPassword";
import CompareModel from "./Page/CompareModal";
import Accessory from "./Page/Accessory";
import TestDriveBooking from "./Page/TestDriveBooking";
import ContactSeller from "./Page/ContactSeller";
import Wishlist from "./Page/Wishlist";



// Admin Pages
import Dashboard from './Admin/Dashboard';
import Analytics from './Admin/Analytics';
import DashboardHome from './Admin/DashboardHome';
import ListingsManagement from './Admin/ListingsManagement';
import { Settings, Sidebar } from 'lucide-react';
import UserList from './Admin/UserList';
import VehiclesList from './Admin/VehiclesList';
import AdminLoginForm from './Admin/AdminLoginForm';


// Admin Sidebar is used in AdminLayout

// Layout Wrapper
const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideNavbar = [
    "/login",
    "/signup",
    "/forgotpassword",
    "/admin",
    "/admin/login",
    "/reset-password",
    "/verify-otp",
    "/dashboard"
  ].includes(location.pathname);
  const hideFooter = hideNavbar || isAdminRoute;

  return (
    <>
      {!hideNavbar && <Navbar />}
      {isAdminRoute ? (
        <Outlet /> // Admin layout will handle layout rendering
      ) : (
        <Outlet />
      )}
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="newcars" element={<NewCars />} />
        <Route path="usedcars" element={<UsedCars />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="reset-password" element={<NewPassword />} />
        <Route path="accessory" element={<Accessory />} />
        <Route path="comparemodel" element={<CompareModel />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="testdrive" element={<TestDriveBooking />} />
        <Route path="contactseller" element={<ContactSeller />} />
        <Route path="cars/:id" element={<ViewDetails />} />

        {/* Admin Routes */}
        {/* <Route path='admin/login' element={<AdminLoginForm></AdminLoginForm>}></Route> */}
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='/admin/analytics' element={<Analytics />} />
        <Route path='dashboardhome' element={<DashboardHome />} />
        <Route path='listingmanagement' element={<ListingsManagement />} />
        <Route path='navbar' element={<Navbar />} />
        <Route path='settings' element={<Settings />} />
        <Route path='sidebar' element={<Sidebar />} />
        <Route path='userlist' element={<UserList />} />
        <Route path='vehicleslist' element={<VehiclesList />} />
      </Route>
    </Routes>
  );
}

export default App;
