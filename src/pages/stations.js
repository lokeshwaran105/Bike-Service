// This component displays a list of bike service stations fetched from the server.


// Imports
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import pic from '../assets/pic1.png';


export function Stations() {
    
    const [stations, setStations] = useState([]); 
    const { authState } = useContext(AuthContext);

    // Function to fetch stations from the server
    const fetchStations = async () => {
        try {

            // API endpoint to fetch stations
            const response = await axios.get('http://localhost:5000/api/get-station'); 

            // Update state with fetched station data
            setStations(response.data); 
            
        } catch (error) {
            // Log error if fetching stations fails
            console.log("Failed to fetch stations", error); 
        }
    }

    // Effect to fetch stations when component mounts
    useEffect(() => {
        fetchStations();
    }, []);

    return (
        <div className='station-container'>
            {!authState.isAuthenticated && (
                <div>
                    <p>Please login to see the stations</p>
                </div>
            )}

            {authState.isAuthenticated && stations.map((station, i) => (
                <div className='card' key={i}>
                    <div className='card-img'>
                        <img src={pic} alt="Station" />
                    </div>
                    <div className='card-content'>
                        <h2>{station.station_name}</h2>
                        <p className='station-city'>City: {station.city}</p>
                        <button><Link to={`/services/${station.owner_id}`} style={{color: 'white', textDecoration: 'none'}} >View Services</Link></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Stations;
