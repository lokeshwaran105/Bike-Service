// This component renders a login page with options for owner and client login.


// Imports
import owner from '../assets/owner.png';
import client from '../assets/client.png';
import { Link } from 'react-router-dom';


export default function Login(){

    // JSX return
    return(
        <div className="container">
            <h1>Login</h1>
            <div className="register">
                <div className="register-cont owner">
                    <img className="register-img owner-img" src={owner} alt="Owner Icon"></img>
                    <p><Link className="register-text" to="/owner-login">Owner</Link></p>
                </div>
                <div className="register-cont client">
                    <img className="register-img client-img" src={client} alt="Client Icon"></img>
                    <p><Link className="register-text" to="/client-login">Client</Link></p>
                </div>
            </div>
        </div>
    );
}
