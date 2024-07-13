// This component fetches and displays all bookings for the logged-in owner. It allows the owner to update the status of bookings and notify clients when a booking is marked as completed.


// Imports
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import '../styles/App.css';
import { toast } from 'react-toastify';
import { send } from 'emailjs-com';


const AllBookings = () => {

    // State initialization
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const { authState } = useContext(AuthContext);

    // Function to fetch all bookings for the logged-in owner
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/owner/get-booking/${authState.ownerId}`);
            setBookings(response.data);
        } catch (error) {
            console.error("Failed to fetch bookings", error);
            toast.error("Failed to fetch bookings");
        }
    };

    // Effect to fetch bookings on component mount
    useEffect(() => {
        fetchBookings();
    }, []);

    // Function to send email notification to client when status is updated to 'Completed'
    const sendEmail = async (email) => {
        try {
            const data = {
                "to_mail": email,
                "client_name": selectedBooking.client_name,
                "service_name": selectedBooking.service_name,
                "bike_name": selectedBooking.bike_no,
                "station_name": selectedBooking.station_name
            };

            await send('service_4q9xv9q', 'template_client', data, 'kHXYQ2SIy2gqA5VQX')
                .then((response) => {
                    console.log('Email sent successfully!', response.status, response.text);
                }, (error) => {
                    console.error('Failed to send email', error);
                });
        } catch (error) {
            console.error("Error sending email", error);
            toast.error("Failed to send email");
        }
    };

    // Function to handle updating status of a booking
    const handleUpdateStatus = (booking) => {
        setSelectedBooking(booking);
        setNewStatus(booking.status);
    };

    // Function to save updated status to the server
    const handleSaveStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/booking-status/${selectedBooking.booking_id}`, { status: newStatus });

            // If status is 'Completed', send email notification to client
            if (newStatus === 'Completed') {
                sendEmail(selectedBooking.email);
            }

            if (response.status === 200) {
                toast.success('Status updated successfully');
                setSelectedBooking(null);
                fetchBookings();
            }
        } catch (error) {
            toast.error('Failed to update status');
            console.error('Failed to update status', error);
        }
    };

    // Function to format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // JSX Return
    return (
        <div className="booking-container">
            <h2>All Bookings</h2>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Bike Name</th>
                        <th>Reg No</th>
                        <th>Phone No</th>
                        <th>Address</th>
                        <th>Booked Date</th>
                        <th>Service Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.client_name}</td>
                            <td>{booking.bike_no}</td>
                            <td>{booking.bike_regno}</td>
                            <td>{booking.phone_no}</td>
                            <td>{booking.address}</td>
                            <td>{formatDate(booking.booked_date)}</td>
                            <td>{booking.service_name}</td>
                            <td>{booking.status || 'Pending'}</td>
                            <td>
                                {booking.status !== 'Completed' && (
                                    <button
                                        className="update-button"
                                        onClick={() => handleUpdateStatus(booking)}
                                    >
                                        Update Status
                                    </button>
                                )}                        
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup for updating status */}
            {selectedBooking && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <button className="close-button" onClick={() => setSelectedBooking(null)}>✖</button>
                        <h3>Update Status</h3>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button className="save-button" onClick={() => handleSaveStatus()}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export component
export default AllBookings;
