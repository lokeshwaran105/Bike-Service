// This component represents the homepage of the Bike Service Management system.


// Imports
import React from 'react';
import banner from '../assets/banner.png';
import h1 from '../assets/h1.jpg';
import h2 from '../assets/h2.jpg';
import '../styles/App.css';


export default function Home() {
    // JSX Return
    return(
        <>
            <div className="banner">
                <img alt='' src={banner} className='banner-img'></img>
            </div>

            <div className="para">
                <div className="para-content">
                    <h2>Welcome to Bike Service Management</h2>
                    <p>The Bike Servicing Management System is a cutting-edge project designed to optimize and enhance the efficiency of bike maintenance services. This system automates the processes of scheduling, tracking, and managing bike repairs, ensuring prompt servicing and higher customer satisfaction. By leveraging technology in the maintenance workflow, it simplifies operations and minimizes manual labor.</p>
                </div>
                <img alt='' src={h1} className='para-img'></img>
            </div>

            <div className="para para-2 para-home">
                <img alt='' src={h2} className='para-img'></img>
                <div className="para-content">
                    <h2>Quality Service and Genuine Parts</h2>
                    <p>We are committed to delivering the best service possible to our customers. Our Bike Servicing Shop uses only genuine and high-quality parts for all repairs and replacements. This dedication to quality ensures the longevity and reliability of your bike, giving you peace of mind and enhancing your overall cycling experience. With us, your bike is treated with care and attention to detail, so you can ride with confidence.</p>
                </div>
            </div>
        </>
    )
}
