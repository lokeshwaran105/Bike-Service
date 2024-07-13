// Displays services managed by the authenticated owner. Allows editing and deletion of services, and provides a link to add new services.


// Imports
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import '../styles/App.css';
import { toast } from "react-toastify";


export default function OwnerService() {
    const [services, setServices] = useState([]);
    const [editService, setEditService] = useState({ 
        id: null,
        owner_id: '',
        service_name: '',
        service_desc: '',
        service_price: ''
    });
    const { authState } = useContext(AuthContext);

    // Function to fetch services from API
    async function fetchServices() {
        try {
            const response = await axios.get(`http://localhost:5000/api/service/${authState.ownerId}`);
            setServices(response.data); // Set services state with fetched data
        } catch (error) {
            console.error("Error fetching services", error);
        }
    }

    // Effect hook to fetch services on component mount
    useEffect(() => {
        fetchServices();
    }, []);

    // Function to handle editing of a service
    const handleEdit = (service) => {
        setEditService(service);
    };

    // Function to handle deletion of a service
    const handleDelete = async (service) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/service/${service.id}`);

            if(response.status === 200){
                console.log("Successfully Deleted...");
                toast.success("Successfully Deleted The Service..."); 
            }
            fetchServices();
        } catch (error) {
            toast.error("Failed to delete the service");
        }
    }

    // Function to handle saving changes to a service
    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/service/${editService.id}`, {
                service_name: editService.service_name,
                service_desc: editService.service_desc,
                service_price: editService.service_price
            });

            if(response.status === 200){
                console.log("Successfully Updated...");
                toast.success("Successfully Updated...");
            }

            // Refresh services list after update
            fetchServices(); 
            setEditService({ id: null, service_name: '', service_desc: '', service_price: '' });
        } catch (error) {
            console.error("Error updating service", error);
        }
    };

    // Function to handle input changes in edit mode
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditService({ ...editService, [name]: value }); 
    };

    // JSX return
    return (
        <div className="service-container">
            <table>
                <thead>
                    <tr className="service-row">
                        <th className="service-data service-name">Service Name</th>
                        <th className="service-data service-desc">Service Description</th>
                        <th className="service-data service-price">Price</th>
                        <th className="service-data service-action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, i) => (
                        <tr key={i}>
                            <td className="service-data service-name" data-label="Service Name">
                                {editService.id === service.id ? (
                                    <input
                                        type="text"
                                        name="service_name"
                                        value={editService.service_name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.service_name
                                )}
                            </td>
                            <td className="service-data service-desc" data-label="Service Description">
                                {editService.id === service.id ? (
                                    <input
                                        type="text"
                                        name="service_desc"
                                        value={editService.service_desc}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.service_desc
                                )}
                            </td>
                            <td className="service-data service-price" data-label="Price">
                                {editService.id === service.id ? (
                                    <input
                                        type="number"
                                        name="service_price"
                                        value={editService.service_price}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.service_price
                                )}
                            </td>
                            <td className="service-data" data-label="Action">
                                <div className="service-action">
                                    {editService.id === service.id ? (
                                        <button className="btn btn-sm btn-success save" onClick={handleSave}>Save</button>
                                    ) : (
                                        <button className="btn btn-sm btn-primary edit" onClick={() => handleEdit(service)}>Edit</button>
                                    )}
                                    <button type="button" className="btn btn-sm btn-danger delete" onClick={() => handleDelete(service)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary">
                <Link to="/add-service" style={{ color: 'white', textDecoration: 'none'}}>Add Service</Link>
            </button>
        </div>
    );
}
