// import logo from './logo.svg';
// import './App.css';
// import { Route, Routes} from 'react-router-dom';
// import Layout from './components/layout.js';
// import OwnerRegister from './components/OwnerRegister.js';
import NavBar from './common/navBar.js';
// import Ownerlogin from './components/ownerLogin.js';
// import Clientregister from './components/clientRegister.js';
// import Home from './components/home.js';
import Footer from './common/footer.js';
// import ContactUs from './components/contact.js';
// import AboutUs from './components/about.js';


// function App() {
//   return (
//     <>
//       <Routes className="App">
//         <Route path="/" Component={<Layout/>} />
//         <Route index element={<Layout />} />
//         <Route path="/owner-register" component={OwnerRegister} />
//         <Route path="/owner-login" component={Ownerlogin} />
//         <Route path="/client-register" component={Clientregister} />
//         <Route path="/contact" component={ContactUs} />
//         <Route path="/about" component={AboutUs} />
//       </Routes>
//     </>
//   );
// }

// export default App;


import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/layout.js';
import OwnerRegister from './auth/OwnerRegister.js';
import OwnerLogin from './auth/ownerLogin.js';
import ClientRegister from './auth/clientRegister.js';
import Home from './pages/home.js';
import ContactUs from './pages/contact.js';
import AboutUs from './pages/about.js';
import Register from './auth/register.js';
import Login from './auth/login.js';
import ClientLogin from './auth/clientLogin.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addservice from './service/addService.js';
import OwnerService from './service/OwnerService.js';
import { AuthProvider } from './context/authContext.js';
import { Stations } from './pages/stations.js';
import StationServices from './service/services.js';
import ClientBookings from './booking/clientBookings.js';
import OwnerBookings from './booking/ownerBookings.js';

function App() {

  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="owner-register" element={<OwnerRegister />} />
            <Route path="owner-login" element={<OwnerLogin />} />
            <Route path="client-register" element={<ClientRegister />} />
            <Route path="client-login" element={<ClientLogin />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="owner-service" element={<OwnerService />} />
            <Route path="add-service" element={<Addservice />} />
            <Route path="stations" element={<Stations />} />
            <Route path="services/:stationId" element={<StationServices />} />
            <Route path="client-bookings" element={<ClientBookings />} />
            <Route path="owner-bookings" element={<OwnerBookings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
    
  );
}

export default App;






// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './components/authContext.js';
// import Layout from './components/layout.js';
// import Home from './components/home.js';
// import Register from './components/register.js';
// import Login from './components/login.js';
// import OwnerRegister from './components/OwnerRegister.js';
// import OwnerLogin from './components/ownerLogin.js';
// import ClientRegister from './components/clientRegister.js';
// import ClientLogin from './components/clientLogin.js';
// import AboutUs from './components/about.js';
// import ContactUs from './components/contact.js';

// const App = () => {
//     return (
//         <>
//             <AuthProvider>
//                 <Routes>
//                     <Route path="/" element={<Layout />}>
//                         <Route index element={<Home />} />
//                         <Route path="register" element={<Register />} />
//                         <Route path="login" element={<Login />} />
//                         <Route path="owner-register" element={<OwnerRegister />} />
//                         <Route path="owner-login" element={<OwnerLogin />} />
//                         <Route path="client-register" element={<ClientRegister />} />
//                         <Route path="client-login" element={<ClientLogin />} />
//                         <Route path="about" element={<AboutUs />} />
//                         <Route path="contact" element={<ContactUs />} />
//                     </Route>
//                 </Routes>
//             </AuthProvider>
//         </>
//     );
// };

// export default App;










