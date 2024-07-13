// This component handles owner registration functionality.


// Imports
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


export default function OwnerRegister() {

    const { authState, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for form data
    const [formData, setformData] = useState({
        fname: '',
        email: '',
        mobile_number: '',
        ownerId: '',
        station_name: '',
        n_password: '',
        c_password: '',
        city: '',
    });

    // Function to handle input change
    async function onHandle(e) {
        setformData({...formData, [e.target.name] : e.target.value});
    }

    // Function to handle form submission
    async function handleSubmit(e){

        e.preventDefault();
        try {
           const response = await axios.post('http://localhost:5000/api/owner-register', {
                full_name: formData.fname,
                email: formData.email,
                mobile_number: formData.mobile_number,
                owner_id: formData.ownerId,
                station_name: formData.station_name,
                n_password: formData.n_password,
                c_password: formData.c_password,
                city: formData.city
            });

            // Handling successful registration response
            if(response.status === 200){
                toast.success("Successfully Registered...");
                const role = "owner";
                
                // Logging in user using login function from AuthContext
                login(formData.ownerId, formData.fname, role);

                console.log(typeof authState.ownerId);
                console.log(typeof authState.ownerName);
                console.log(typeof authState.role);
                navigate('/');
            }

        } catch (e) {
            // Handling registration error
            toast.error("Cannot register");
            console.log("Cannot register", e);
        }
    }

    // JSX return
    return(
        <div className="owner-register">
            <h1>Owner Register</h1>
            <form onSubmit={handleSubmit} className='owner-form'>
                <div class="mb-3">
                    <label for="fname" class="form-label">Full Name</label>
                    <input name="fname" type="text" onChange={onHandle} class="form-control" id="owner-name" aria-describedby="emailHelp" required/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input name="email" type="email" onChange={onHandle} class="form-control" id="email" aria-describedby="emailHelp" required/>
                </div>
                <div class="mb-3">
                    <label for="mobile_number" class="form-label">Phone number</label>
                    <input name="mobile_number" type="number" onChange={onHandle} class="form-control" id="number" aria-describedby="emailHelp" required/>
                </div>
                <div class="mb-3">
                    <label for="ownerId" class="form-label">ID</label>
                    <input name="ownerId" type="number" onChange={onHandle} class="form-control" id="owner-id" aria-describedby="emailHelp" required/>
                </div>
                <div class="mb-3">
                    <label for="sname" class="form-label">Station Name</label>
                    <input name="station_name" type="text" onChange={onHandle} class="form-control" id="station_name" aria-describedby="emailHelp" required/>
                </div>
                <div class="mb-3">
                    <label for="n_password" class="form-label">New Password</label>
                    <input name="n_password" type="password" onChange={onHandle} class="form-control" id="n_password" required/>
                </div>
                <div class="mb-3">
                    <label for="c_password" class="form-label">Confirm Password</label>
                    <input name="c_password" type="password" onChange={onHandle} class="form-control" id="c_password" required/>
                </div>
                <div class="mb-3">
                    <label for="city" class="form-label">City</label>
                    <input name="city" type="text" onChange={onHandle} class="form-control" id="city" required/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
