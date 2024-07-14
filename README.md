# Bike Service 
## Overview ##
This project is a full-stack web application designed to manage and book services at various stations. The application consists of a frontend built with React.js and a backend server built with Node.js and Express, connected to a SQL database. Users can browse available stations, view the services offered at each station, and book services.
<br/>
## Prerequisites ##
Node.js
npm (Node Package Manager)
SQL Database (e.g., MySQL, PostgreSQL)
<br/>
## Getting Started ##
### 1.Clone the repository: ###
```bash
https://github.com/lokeshwaran105/Bike-Service.git
```

### 2.Install dependencies: ###
Navigate to the root directory and install the dependencies:
```bash
cd Bike-service
npm install
```

### 3.Set up the SQL database: ###
Ensure your SQL database is running and set up the necessary tables. Configure your SQL database with your details in server.js file
```bash
host: 'localhost',
user: 'YOUR_USERNAME',
password: 'YOUR_PASSWORD',
database: 'bikeservice'
```

### 4.Create Tables: ###
```bash
CREATE TABLE ownerdetails ( id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(255) not null, email VARCHAR(255) NOT NULL UNIQUE, phone_no VARCHAR(255) not null UNIQUE, owner_id VARCHAR(255) not null UNIQUE, n_pass VARCHAR(255) not null, c_pass VARCHAR(255) not null, city VARCHAR(255) not null, station_name VARCHAR(255));
CREATE TABLE ownerservices ( id INT AUTO_INCREMENT PRIMARY KEY,owner_id VARCHAR(255), service_name VARCHAR(255) NOT NULL, service_desc VARCHAR(255), service_price DECIMAL(10, 2),FOREIGN KEY (owner_id) REFERENCES ownerdetails(owner_id));
CREATE TABLE clientdetails ( id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(255) not null, email VARCHAR(255) NOT NULL UNIQUE, phone_no VARCHAR(255) not null UNIQUE, client_id VARCHAR(255) not null UNIQUE, n_pass VARCHAR(255) not null, c_pass VARCHAR(255) not null, city VARCHAR(255) not null);
CREATE TABLE bookings (id VARCHAR(255) PRIMARY KEY, client_name VARCHAR(255) NOT NULL, bike_no VARCHAR(255) NOT NULL, bike_regno VARCHAR(255) NOT NULL, phone_no VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, station_name VARCHAR(255) NOT NULL, owner_id VARCHAR(255) NOT NULL, booked_date VARCHAR(255) NOT NULL, service_name VARCHAR(255) NOT NULL, client_id VARCHAR(255) NOT NULL);
```

### 5.Running the Application ###

Run the server file:
```bash
cd src/backend
node server.js
```

Run the index.js file:
```bash
npm start
```







