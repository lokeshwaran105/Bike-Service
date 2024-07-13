// Displays services offered at a specific station based on stationId parameter. Allows booking services and provides a link to return to the list of stations.


// Imports
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';
import BookingForm from '../booking/booking';


const StationServices = () => {
    const { stationId } = useParams(); 
    const [stationServices, setStationServices] = useState([]); 
    const [stationName, setStationName] = useState(''); 
    const [showPopup, setShowPopup] = useState(false);
    const [selectedService, setSelectedService] = useState(null); 

    // Function to fetch services offered at the station based on stationId
    const fetchStationServices = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/get-services/${id}`);
            setStationServices(response.data); // Sets station services data from API response
        } catch (error) {
            console.log("Failed to fetch services", error);
        }
    };

    // Function to fetch station name based on stationId
    const fetchStationName = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/get-station-name/${id}`);
            if (response.status === 200) {
                setStationName(response.data[0].station_name); // Sets station name from API response
            }
        } catch (error) {
            console.log("Failed to fetch station name", error);
        }
    };

    // Effect hook to fetch station services and station name when stationId changes
    useEffect(() => {
        fetchStationServices(stationId);
        fetchStationName(stationId);
    }, [stationId]);

    // Function to handle booking a service, sets selected service and shows booking popup
    const handleBookService = (service) => {
        setSelectedService(service);
        setShowPopup(true);
    };

    // Function to close booking popup and reset selected service
    const closePopup = () => {
        setShowPopup(false);
        setSelectedService(null);
    };

    // JSX return
    return (
        <div className='station-services-container'>
            <h2>Services at {stationName}</h2>
            <div className='services-grid'>
                {stationServices.map((service, index) => (
                    <div className='service-card' key={index}>
                        <h3>{service.service_name}</h3>
                        <p>{service.service_desc}</p>
                        <p>Price: {service.service_price}</p>
                        <button className='book-service-button' onClick={() => handleBookService(service)}>Book Service</button>
                    </div>
                ))}
            </div>
            <Link to='/stations' className='back-button'>Back to Stations</Link>

            {showPopup && <BookingForm service={selectedService} closePopup={closePopup} />}
        </div>
    );
};

export default StationServices;
