// Description: This component handles the form for booking a service. It allows users to input their details and sends a confirmation email to the service owner upon booking.


// Imports
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';
import { send } from 'emailjs-com';


const BookingForm = ({ service, closePopup }) => {

    // Context and state initialization
    const { authState } = useContext(AuthContext);
    const [ownerMail, setOwnerMail] = useState('');
    const [ownerName, setOwnerName] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        bike_name: '',
        reg_no: '',
        email: '',
        phone_no: '',
        addr: '',
        date: null,
        station_name: '',
    });


    // Data object for sending email
    const data = {
        "to_mail": ownerMail,
        "owner_name": ownerName,
        "client_name": formData.name,
        "client_email": formData.email,
        "bike_name": formData.bike_name,
        "phone_no": formData.phone_no,
        "service_name": service.service_name
    }

    // Function to handle input changes
    async function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Function to fetch station name based on owner_id
    const fetchStationName = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/get-station-name/${id}`);
            if (response.status === 200) {
                setFormData({ ...formData, station_name: response.data[0].station_name });
                setOwnerMail(response.data[0].email);
                setOwnerName(response.data[0].full_name);
            }
        } catch (error) {
            console.log("Failed to fetch station name", error);
        }
    };

    // Function to send confirmation email
    const sendMail = async () => {
        await send('service_4q9xv9q', 'template_owner', data, 'kHXYQ2SIy2gqA5VQX')
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
            }, (error) => {
                console.error('Failed to send email', error);
            });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetch station name before submitting
        fetchStationName(service.owner_id);

        try {
            // Send booking request to server
            const response = await axios.post('http://localhost:5000/api/book-service', {
                name: formData.name,
                bike_name: formData.bike_name,
                reg_no: formData.reg_no,
                email: formData.email,
                phone_no: formData.phone_no,
                addr: formData.addr,
                date: formData.date,
                station_name: formData.station_name,
                owner_id: service.owner_id,
                service_name: service.service_name,
                client_id: authState.ownerId,
                status: "Pending"
            });

            // If booking is successful, send confirmation email and display success message
            if (response.status === 200) {
                sendMail();
                toast.success("Successfully Booked The Service");
                closePopup();
            }
        } catch (error) {
            console.log("Failed to book the service", error);
        }
    };

    // JSX return
    return (
        <div className='booking-popup'>
            <div className='booking-popup-content'>
                <button className='close-button' onClick={closePopup}>X</button>
                <h3>Book Service: {service.service_name}</h3>
                <form onSubmit={handleSubmit} className='booking-form'>
                    <label>
                        Name:
                        <input type='text' name='name' value={formData.name} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Bike Name (With Model Name):
                        <input type='text' name='bike_name' value={formData.bike_name} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Registration Number:
                        <input type='text' name='reg_no' value={formData.reg_no} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Email Address:
                        <input type='email' name='email' value={formData.email} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Phone Number:
                        <input type='number' name='phone_no' value={formData.phone_no} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Address:
                        <input type='text' name='addr' value={formData.addr} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Date:
                        <input type='date' name='date' value={formData.date} onChange={handleInputChange} required />
                    </label>
                    <button type='submit' className='submit-button'>Submit</button>
                </form>
            </div>
        </div>
    );
};


export default BookingForm;
