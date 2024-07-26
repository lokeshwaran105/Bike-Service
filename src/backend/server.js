const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/api/owner-register', async (req, res) => {

    const {full_name, email, mobile_number, owner_id, station_name, n_password, c_password, city} = req.body;

    const query = 'INSERT INTO ownerdetails (full_name, email, phone_no, owner_id, n_pass, c_pass, city, station_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [full_name, email, mobile_number, owner_id, n_password, c_password, city, station_name], (err, result) => {
        if(err){
            console.log("Error registering owner", err);
            res.status(500).send("Error registering owner");
            return;
        }
        res.status(200).send("Successfully registered owner");
        console.log(result);
    });
});

app.post('/api/client-register', async (req, res) => {
    console.log(req.body);
    const {full_name, email, mobile_number, client_id, n_password, c_password, city} = req.body;
    const query = 'INSERT INTO clientdetails (full_name, email, phone_no, client_id, n_pass, c_pass, city) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [full_name, email, mobile_number, client_id, n_password, c_password, city], (err, result) => {
        if(err){
            console.log("Error registering owner", err);
            res.status(500).send("Error registering owner");
            return;
        }

        res.status(200).send("Successfully registered");
        console.log(result);
    });
});


app.post('/api/add-service', async (req, res) => {
    const {owner_id, service_name, service_desc, service_price} = req.body;

    const query = 'INSERT INTO ownerservices(owner_id, service_name, service_desc, service_price) VALUES (?, ?, ?, ?)';

    db.query(query, [owner_id, service_name, service_desc, service_price], (err, result) => {
        if(err){
            console.error('Failed to add service', err);
            res.status(500).send('Error');
            return;
        }

        res.status(200).send("Successfully Added the Service");
        console.log(result);
    })
});

app.post('/api/book-service', async (req, res) => {
    const {name, bike_name, reg_no, email, phone_no, addr, date, station_name, owner_id, service_name, client_id, status} = req.body;

    const query = 'INSERT INTO bookings(client_name, bike_no, bike_regno, email, phone_no, address, station_name, owner_id, booked_date, service_name, client_id, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [name, bike_name, reg_no, email, phone_no, addr, station_name, owner_id, date, service_name, client_id, status], (err, result) => {
        if(err){
            console.log("Failed to book service", err);
            res.status(400).send("Failed to booking the service");
        }

        res.status(200).send("Successfully booked the service");
    })
})


app.get('/api/service/:owner_id', async (req, res) => {
    const owner_id = req.params.owner_id;

    const query = 'SELECT * FROM ownerservices WHERE owner_id = ?';

    db.query(query, [owner_id], (err, result) => {
        if (err) {
            console.error("Failed to fetch services:", err);
            res.status(500).send("Error retrieving data");
            return;
        }

        res.status(200).json(result);
    });
});

app.delete('/api/service/:service_id', async (req, res) => {
    const service_id = req.params.service_id;

    const query = 'DELETE FROM ownerservices where id = ?';

    db.query(query, [service_id], (err, result) => {
        if(err){
            console.error("Failed to delete services:", err);
            res.status(500).send("Error on deleting the service");
            return;
        }

        res.status(200).send("Successfully Deleted the Service...");
    })
})

app.delete('/api/del-booking/:booking_id', async (req, res) => {
    const booking_id = req.params.booking_id;

    const query = 'DELETE FROM bookings where booking_id = ?';

    db.query(query, [booking_id], (err, result) => {
        if(err){
            console.error("Failed to cancel the booking", err);
            res.status(500).send("Error on cancelling the booking");
            return;
        }

        res.status(200).send("Successfully cancelled the booking...");
    })
})

app.get('/api/get-station', async (req, res) => {
    const query = 'select * from ownerdetails';

    db.query(query, (err, result) => {
        if(err){
            console.error("Failed to fetch stations:", err);
            res.status(500).send("Error on fetching the stations");
            return;
        }

        res.status(200).json(result);
    })
});

app.get('/api/get-clients', async (req, res) => {
    const query = 'select * from clientdetails';

    db.query( query, (err, result) => {
        if(err){
            console.log("Can't fetch client details", err);
            res.status(500).send("Error in fetching client details");
            return;
        }

        res.status(200).json(result);
    })
})

app.get('/api/get-services/:id', async (req, res) => {
    const owner_id = req.params.id;
    const query = 'select * from ownerservices where owner_id = ?';

    db.query(query, [owner_id], (err, result) => {
        if(err){
            console.log("Failed to fetch service", err);
            res.status(500).send("Error in fetching services");
            return;
        }

        res.status(200).json(result);
        console.log(result);
    })
});

app.get('/api/get-station-name/:id', async (req, res) => {
    const owner_id = req.params.id;
    const query = 'select * from ownerdetails where owner_id = ?';

    db.query(query, [owner_id], (err, result) => {
        if(err){
            console.log("Failed to fetch Station Name", err);
            res.status(500).send("Error in fetching Station Name");
            return;
        }

        res.status(200).json(result);
    })

});

app.get('/api/client/get-booking/:client_id', async (req, res) => {

    const client_id = req.params.client_id;
    const query = 'select * from bookings where client_id = ?';

    db.query(query, [client_id], (err, result) => {
        if(err){
            console.log("Failed to fetch booking details", err);
            res.status(400).send("Failed to fetch booking details");
            return;
        }

        res.status(200).json(result);
    })
})

app.get('/api/owner/get-booking/:owner_id', async (req, res) => {

    const owner_id = req.params.owner_id;
    const query = 'select * from bookings where owner_id = ?';

    db.query(query, [owner_id], (err, result) => {
        if(err){
            console.log("Failed to fetch booking details", err);
            res.status(400).send("Failed to fetch booking details");
            return;
        }

        res.status(200).json(result);
    })
});

app.put('/api/booking-status/:booking_id', async (req, res) => {
    const booking_id = req.params.booking_id;
    const {status} = req.body;

    if(!status){
        res.status(400).send("Please select any status option");
        return;
    }

    const query = 'UPDATE bookings SET status = ? where id = ?';

    db.query(query, [status, booking_id], (err, result) => {

        if(err){
            console.log("Failed to update the status");
            res.status(400).send("Failed to updating the status of the service");
            return;
        }

        res.status(200).send("Successfully Updated The Status");
    })
})

app.put('/api/service/:service_id', async (req, res) => {
    const service_id = req.params.service_id;
    const {service_name, service_desc, service_price} = req.body;
    if (!service_name || !service_price || !service_desc) {
        res.status(400).send("Service name and price are required");
        return;
    }
    const query = 'UPDATE ownerservices SET service_name = ?, service_desc = ?, service_price = ? WHERE id = ?';

    db.query(query, [service_name, service_desc, service_price, service_id], (err, result) => {
        if(err){
            console.error("Failed to update services:", err);
            res.status(500).send("Error on updating the service");
            return;
        }

        res.status(200).send("Successfully Updated the service");

    })
})

app.post('/api/owner-login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM ownerdetails WHERE email = ?';

    db.query(query, [email], (err, result) => {

        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ error: 'Error logging in' });
        }

        
        if (result.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        const user = result[0];

        console.log(user);

        if (user.n_pass !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        return res.status(200).json({ownerId: user.owner_id, full_name: user.full_name});
    });
});

app.post('/api/client-login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM clientdetails WHERE email = ?';

    db.query(query, [email], (err, result) => {

        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ error: 'Error logging in' });
        }
        
        if (result.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        const user = result[0];

        console.log(user);

        if (user.n_pass !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        return res.status(200).json({clientId: user.client_id, full_name: user.full_name});
    });
});



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'bikeservice'
});

db.connect(err => {
    if(err){
        console.log("Cannot connect...", err);
        return;
    }

    console.log("Connected Successfully");
});

app.listen(port, () => {
    console.log("Server running on ", port);
});



