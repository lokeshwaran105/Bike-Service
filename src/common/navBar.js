import '../styles/App.css'
import logo from '../assets/Colorful Abstract Online Shop Free Logo.png'
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/authContext';
import { useContext } from 'react';


export default function Navbar() {
    const { authState, logout } = useContext(AuthContext);

    function handleLogout(e) {
        e.preventDefault();
        logout();
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <img src={logo} className="navbar-brand" alt='logo' />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        {authState.isAuthenticated && authState.role === "owner" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/owner-service">Your Services</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/owner-bookings">View All Bookings</Link>
                                </li>
                            </>
                        )}
                        {authState.isAuthenticated && authState.role === "client" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/stations">Stations</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/client-bookings">Your Bookings</Link>
                                </li>
                            </>
                        )}
                        {!authState.isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About Us</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <form className="d-flex" role="search">
                        {authState.isAuthenticated ? (
                            <button className="logout-btn link-logout" type="button" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <button className="me-2 login-btn" type="button"><Link className='link-reg' style={{textDecoration: 'none'}} to="/register">Register</Link></button>
                                <button className="me-2 register-btn" type="button"><Link className='link-login' style={{textDecoration: 'none'}} to="/login">Login</Link></button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    );
}