// This component handles the registration functionality for clients.


// Imports
import { useContext, useState } from 'react';
import '../styles/App.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


export default function ClientRegister() {
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        fname: '',
        email: '',
        mobile_number: '',
        clientId: '',
        n_password: '',
        c_password: '',
        city: '',
    });

    // Event handler for input change
    async function onHandle(e) {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    // Form submission handler
    async function handleSubmit(e){
        e.preventDefault();
        try {
            // API call to register client
            const response = await axios.post('http://localhost:5000/api/client-register', {
                full_name: formData.fname,
                email: formData.email,
                mobile_number: formData.mobile_number,
                client_id: formData.clientId,
                n_password: formData.n_password,
                c_password: formData.c_password,
                city: formData.city
            });

            // Handling successful registration
            if(response.status === 200){
                toast.success("Successfully Registered...");
                login(formData.clientId, formData.fname, "client"); // Login after registration
                navigate('/'); // Redirect to home page
            }

        } catch (error) {
            // Error handling for registration failure
            toast.error("Cannot register");
            console.log("Cannot register", error);
        }
    }

    // JSX return
    return(
        <div className="owner-register">
            <h1>Client Register</h1>
            <form onSubmit={handleSubmit} className='owner-form'>
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">Full Name</label>
                    <input name="fname" type="text" onChange={onHandle} className="form-control" id="owner-name" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name="email" type="email" onChange={onHandle} className="form-control" id="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile_number" className="form-label">Phone number</label>
                    <input name="mobile_number" type="number" onChange={onHandle} className="form-control" id="number" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="clientId" className="form-label">ID</label>
                    <input name="clientId" type="number" onChange={onHandle} className="form-control" id="client-id" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="n_password" className="form-label">New Password</label>
                    <input name="n_password" type="password" onChange={onHandle} className="form-control" id="n_password" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="c_password" className="form-label">Confirm Password</label>
                    <input name="c_password" type="password" onChange={onHandle} className="form-control" id="c_password" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input name="city" type="text" onChange={onHandle} className="form-control" id="city" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
