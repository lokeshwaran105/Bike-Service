// This component handles owner login functionality.


// Imports
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


export default function OwnerLogin() {
    const navigate = useNavigate();
    const { authState, login } = useContext(AuthContext);

    // State for form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Function to handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending login request to the server
            const response = await axios.post('http://localhost:5000/api/owner-login', {
                email: formData.email,
                password: formData.password,
            });

            // Handling successful login response
            if (response.status === 200) {
                const { ownerId, full_name } = response.data;
                const role = "owner";

                // Logging in user using login function from AuthContext
                login(ownerId, full_name, role);

                toast.success("Successfully Logged In");
                navigate('/');
            } else {
                toast.error("Login failed. Please check your credentials.");
            }

        } catch (error) {
            // Handling login error
            toast.error("Login failed. Please try again later.");
            console.error("Login Error:", error);
        }
    }

    // JSX return
    return (
        <div className="owner-login">
            <h1>Owner Login</h1>
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
