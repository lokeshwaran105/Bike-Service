// This component allows authenticated owners to add new services for their bike servicing station.


// Imports
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


export default function AddService() {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState([]);

    // State to hold service details
    const [services, setService] = useState({
        service_name: '',
        service_desc: '',
        service_price: null
    });

    const fetchStationServices = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/get-services/${id}`);
            setServiceData(response.data); // Sets station services data from API response
        } catch (error) {
            console.log("Failed to fetch services", error);
        }
    };

    useEffect(() => {
        fetchStationServices(authState.ownerId);
    }, []);


    console.log(serviceData);

    // Function to handle input changes
    const handleChange = (e) => {
        setService({ ...services, [e.target.name]: e.target.value });
    };
    

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if owner is authenticated and ownerId is available
        if (!authState.isAuthenticated || !authState.ownerId) {
            toast.error('Owner ID is not available.');
            return;
        }
        
        try {

            for(let i=0; i<serviceData.length; i++){
                if(serviceData[i].service_name.toLowerCase() === services.service_name.toLowerCase()){
                    toast("Service have already registered");
                    return;
                }
            }

            // Send POST request to add service endpoint
            const response = await axios.post('http://localhost:5000/api/add-service', {
                owner_id: authState.ownerId,
                service_name: services.service_name, 
                service_desc: services.service_desc,
                service_price: services.service_price
            });

            // Check if service addition was successful
            if (response.status === 200) {
                toast.success('Successfully added...');
                navigate('/owner-service');
            }
        } catch (error) {
            // Log error if service addition fails
            console.error('Error adding service:', error); 
            toast.error('Failed to add service.');
        }
    };

    return (

        // JSX Return
        <div className="add-services">
            <h1>Add Your Service</h1>
            <form onSubmit={handleSubmit} className="service-form">
                <div className="mb-3">
                    <label htmlFor="service_name" className="form-label">Service Name</label>
                    <input
                        name="service_name"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        id="service_name"
                        aria-describedby="serviceNameHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="service_desc" className="form-label">Service Description</label>
                    <input
                        name="service_desc"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        id="service_desc"
                        aria-describedby="serviceNameHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="service_price" className="form-label">Price</label>
                    <input
                        name="service_price"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        id="service_price"
                    />
                </div>
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    );
}
