// This component displays registration options for owners and clients.


// Imports
import owner from '../assets/owner.png';
import client from '../assets/client.png';
import { Link } from 'react-router-dom';


export default function Register(){

    // JSX return
    return(
        <div className="container">
            <h1>Register</h1>
            <div className="register">
                <div className="register-cont owner">
                    <img className="register-img owner-img" src={owner} alt="Owner Registration"></img>
                    <p><Link className="register-text" to="/owner-register">Owner</Link></p>
                </div>
                <div className="register-cont client">
                    <img className="register-img client-img" src={client} alt="Client Registration"></img>
                    <p><Link className="register-text" to="/client-register">Client</Link></p>
                </div>
            </div>
        </div>
    );
}
