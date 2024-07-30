# Flight Info Microservice

## Overview

The Flight Info Microservice is designed to handle client requests for flight information. The system architecture includes a frontend for user interaction, a backend for processing API calls and querying the database, and a MongoDB database for storing flight data.
![image](https://github.com/user-attachments/assets/b6e43316-bb89-4d84-916e-6bda19e0f4ed)

### Architecture
![image](https://github.com/user-attachments/assets/5dc9e9c6-7316-4a44-92bc-d5d2e9921a50)

### Flights collection in mongodb
![image](https://github.com/user-attachments/assets/9fa9e65b-92f5-46fc-a8fb-3d43f62c25ed)
### users database collection in mongodb
![image](https://github.com/user-attachments/assets/d9753cf5-2418-41d9-bb65-e647f0f2f795)

## Architecture Components

1. **Frontend:**
   - **Description:** The user interface where clients enter flight details.
   - **Role:** Captures user input and displays the flight information retrieved from the backend.

2. **Backend:**
   - **Description:** The core processing unit of the microservice.
   - **Role:** Handles API calls from the frontend, queries the MongoDB database, and returns the processed data.

3. **MongoDB Database:**
   - **Description:** The database system used for storing flight data.
   - **Role:** Stores and manages flight information, enabling efficient querying and retrieval of data.

4. **Flight Info Microservice:**
   - **Description:** The specific service responsible for managing flight-related data.
   - **Role:** Interfaces with the backend to provide flight information as per client requests.

## Workflow

1. **Client Request:**
   - A client enters flight details via the frontend interface.

2. **API Call:**
   - The frontend sends an API call to the backend with the client's flight information.

3. **Database Query:**
   - The backend queries the MongoDB database to retrieve the requested flight data.

4. **Data Retrieval:**
   - The database returns the queried data to the backend.

5. **Response to Client:**
   - The backend processes the data and sends a response back to the frontend, which displays the information to the client.

## Technology Stack

- **Frontend:** React.
- **Backend:** Flask-pyton.
- **Database:** MongoDB for data storage and retrieval.
- **API:** RESTful API design for communication between frontend and backend.

## Getting Started

### Prerequisites

- reactjs
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/flight-info-microservice.git
   cd flight-info-microservice
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - Make sure MongoDB is installed and running.

4. **Start the server:**
   ```bash
   npm start
   ```
   

5. **Set up the backend:**
   - Create a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
     ```
   - Install the dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the backend server:
     ```bash
     python app.py
     ```
6. **Set up MongoDB:**
   - Ensure MongoDB is installed and running.

## Running the Application( only if you are using notification_service along with this microservice)

1. **Start MongoDB**: Ensure MongoDB is running locally.
2. **Start Kafka**: Ensure Kafka is running locally.
3. **Run Kafka Producer**: 
   ```sh
   python producer.py
   ```
4. **Run Flask App**:
   ```sh
   python app.py
   ```
5. **Frontend**: Make API calls to the `/update` endpoint to fetch the latest flight updates.

## Installation

To get started with the Notifications Microservice, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hardikbahri/notifications_microservice.git
   cd notifications_microservice
   ```

2. **Install Dependencies**

   Ensure you have Python installed. Then, install the necessary packages:

   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and set up the necessary environment variables. Example:

   ```
   DATABASE_URL=your_database_url
   KAFKA_BROKER_URL=your_kafka_broker_url
   ```

## Usage

1. **Start Kafka**

   To start Kafka, you need to run Zookeeper and Kafka servers:

   ```bash
   # Start Zookeeper
   bin/zookeeper-server-start.sh config/zookeeper.properties

   # Start Kafka server
   bin/kafka-server-start.sh config/server.properties
   ```

2. **Set Up MongoDB Replica Set**

   Run the following commands to set up a MongoDB replica set. This should be done only once:

   ```bash
   # Start MongoDB instances
   mongod --dbpath "C:\Program Files\MongoDB\Server\6.0\data" --port 27017 --bind_ip 127.0.0.1
   taskkill /F /IM mongod.exe     # Terminate if it creates errors
   mongod --dbpath "C:\Program Files\MongoDB\Server\6.0\data" --port 27018 --bind_ip 127.0.0.1
   mongod --dbpath "C:\Program Files\MongoDB\Server\6.0\data" --port 27019 --bind_ip 127.0.0.1

   # Initialize MongoDB replica set
   mongod --dbpath "C:\Program Files\MongoDB\Server\6.0\data" --port 27017 --replSet "rs0" --bind_ip 127.0.0.1
   mongod --dbpath "C:\Program Files\MongoDB\Server\6.0\data2" --port 27018 --replSet "rs0" --bind_ip 127.0.0.1
   mongod --dbpath "C:\Program Files\MongoDB\Server\6.0\data3" --port 27019 --replSet "rs0" --bind_ip 127.0.0.1

   # Connect to MongoDB and initialize replica set
   mongosh --port 27017
   ```

   Inside the `mongosh` shell, run:

   ```javascript
   rs.initiate({
     _id: "rs0",
     members: [
       { _id: 0, host: "127.0.0.1:27017" },
       { _id: 1, host: "127.0.0.1:27018" },
       { _id: 2, host: "127.0.0.1:27019" }
     ]
   })
   ```

3. **Run the Microservice**

   Start the microservice using:

   ```bash
   python app.py
   ```

   or, if you use a specific entry point:

   ```bash
   flask run
   ```

4. **Access the API**

   The microservice will be accessible at `http://localhost:5002` by default.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them.
4. Submit a pull request with a description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
