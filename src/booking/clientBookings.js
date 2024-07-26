// Description: This component fetches and displays bookings for the logged-in client. It allows clients to view their bookings and cancel pending ones.


// Imports
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import '../styles/App.css';
import { toast } from 'react-toastify';


const ClientBookings = () => {

    // State initialization
    const [bookings, setBookings] = useState([]);
    const { authState } = useContext(AuthContext);

    // Function to handle booking cancellation
    const handleCancelBooking = async (booking_id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/del-booking/${booking_id}`);
            if (response.status === 200) {
                console.log("Successfully Cancelled...");
                toast.success("Successfully cancelled the booking...");
                fetchBookings();
            }
        } catch (error) {
            toast.error("Failed to cancel the booking");
            console.error("Error cancelling booking:", error);
        }
    };

    // Function to fetch bookings for the logged-in client
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/client/get-booking/${authState.ownerId}`);
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

    // Function to format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // JSX Return
    return (
        <div className="booking-container">
            <h2>Your Bookings</h2>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>Bike Name</th>
                        <th>Reg No</th>
                        <th>Phone No</th>
                        <th>Address</th>
                        <th>Station Name</th>
                        <th>Booked Date</th>
                        <th>Service Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.bike_no}</td>
                            <td>{booking.bike_regno}</td>
                            <td>{booking.phone_no}</td>
                            <td>{booking.address}</td>
                            <td>{booking.station_name}</td>
                            <td>{formatDate(booking.booked_date)}</td>
                            <td>{booking.service_name}</td>
                            <td>{booking.status || 'Pending'}</td>
                            <td>
                                {booking.status !== 'Completed' && (
                                    <button
                                        className="cancel-button"
                                        onClick={() => handleCancelBooking(booking.booking_id)}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default ClientBookings;
