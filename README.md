# Bike-Service
This project is a full-stack web application designed to manage and book services at various stations. The application consists of a frontend built with React.js and a backend server built with Node.js and Express, connected to a SQL database. Users can browse available stations, view the services offered at each station, and book services.

# Prerequisites
Node.js <br />
npm (Node Package Manager) <br />
SQL Database (e.g., MySQL, PostgreSQL)

# Getting Started
**1.Clone the repository:** <br/>
```bash
git clone https://github.com/your-username/your-repository.git
```
<br/>

```bash
cd Bike-Service
```
<br>

**2.Install dependencies:**

```bash
npm install
```

**4.Setup SQL Database:**
```bash
create database bikeservice;
CREATE TABLE ownerdetails ( id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(255) not null, email VARCHAR(255) NOT NULL UNIQUE, phone_no VARCHAR(255) not null UNIQUE, owner_id VARCHAR(255) not null UNIQUE, n_pass VARCHAR(255) not null, c_pass VARCHAR(255) not null, city VARCHAR(255) not null, station_name VARCHAR(255));
CREATE TABLE ownerservices ( id INT AUTO_INCREMENT PRIMARY KEY,owner_id VARCHAR(255) not null, service_name VARCHAR(255) NOT NULL, service_price DECIMAL(10, 2),FOREIGN KEY (owner_id) REFERENCES ownerdetails(owner_id));
CREATE TABLE clientdetails ( id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(255) not null, email VARCHAR(255) NOT NULL UNIQUE, phone_no VARCHAR(255) not null UNIQUE, client_id VARCHAR(255) not null UNIQUE, n_pass VARCHAR(255) not null, c_pass VARCHAR(255) not null, city VARCHAR(255) not null);
CREATE TABLE bookings (id VARCHAR(255) PRIMARY KEY, client_name VARCHAR(255) NOT NULL, bike_no VARCHAR(255) NOT NULL, bike_regno VARCHAR(255) NOT NULL, phone_no VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, station_name VARCHAR(255) NOT NULL, owner_id VARCHAR(255) NOT NULL, booked_date VARCHAR(255) NOT NULL, service_name VARCHAR(255) NOT NULL, client_id VARCHAR(255) NOT NULL);
```

**5.Connect the database inside the server.js file**
```bash
host: 'localhost',
user: YOUR_USERNAME,
password: YOUR_PASSWORD,
database: 'bikeservice'
```

**6.Running the Application:**

```bash
npm run dev
```
