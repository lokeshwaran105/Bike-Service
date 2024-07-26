// This component handles the login functionality for clients.


// Imports
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

// Component function
export default function OwnerLogin() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // State for form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Event handler for input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // API call to login endpoint
            const response = await axios.post('http://localhost:5000/api/client-login', {
                email: formData.email,
                password: formData.password,
            });

            // Handling successful login
            if (response.status === 200) {
                const { clientId, full_name } = response.data;
                
                // Call login function from AuthContext
                login(clientId, full_name, "client");
                toast.success("Successfully Logged In");
                navigate('/');
            } else {
                // Login failed
                toast.error("Login failed. Please check your credentials.");
            }

        } catch (error) {
            // Error handling for login failure
            toast.error("Login failed. Please try again later.");
            console.error("Login Error:", error);
        }
    }

    // JSX return
    return (
        <div className="owner-login">
            <h1>Client Login</h1>
            <form className='owner-form' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" onChange={handleChange} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
