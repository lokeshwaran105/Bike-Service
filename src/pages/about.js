// This component displays information about the Bike Servicing Management System.


// Imports
import React from 'react';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';
import '../styles/App.css';


export default function AboutUs(){

    // JSX Return
    return(
        <div className="about-us">
            <h1>About Us</h1>
            <div className="para">
                <div className="para-content">
                    <p>The Bike Servicing Management System is a cutting-edge project designed to optimize bike maintenance services by automating scheduling, tracking, and managing repairs for timely servicing and enhanced customer satisfaction. By integrating technology, it simplifies operations and reduces manual effort. Administrators can efficiently handle employee records, assign roles, generate reports, and manage workflows, while employees can access profiles, view schedules, request leave, and communicate with managers. Managers can track performance, approve requests, and ensure smooth team operations.</p>
                </div>
                <img src={pic3} className='para-img' alt="Bike Servicing Management System" />
            </div>

            <div className="para para-2">
                <img src={pic4} className='para-img' alt="Bike Servicing Shop" />
                <div className="para-content">
                    <p>We are dedicated to delivering the best service possible to our customers, using only genuine, high-quality parts for all repairs and replacements to ensure the longevity and reliability of your bike. This commitment gives you peace of mind and enhances your overall cycling experience. At our Bike Servicing Shop, your bike receives meticulous care and attention to detail, allowing you to ride with confidence. Our team of highly skilled and experienced technicians, with extensive knowledge of various bike makes and models, takes pride in providing top-notch servicing, repairs, and maintenance.</p>
                </div>
            </div>
        </div>
    )
}
