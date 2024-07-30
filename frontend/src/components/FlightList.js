import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Container, Alert, Row, Col, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FlightList.css';
import Notification from './Notification'; // Import the Notification component

const FlightList = () => {
  const [flightData, setFlightData] = useState([]);
  const [departing, setDeparting] = useState('');
  const [arriving, setArriving] = useState('');
  const [date, setDate] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [seenUpdates, setSeenUpdates] = useState(new Set()); // Track seen update IDs

  // Function to add a new notification
  const addNotification = (message, type = 'info') => {
    const id = Date.now(); // Unique ID based on timestamp
    setNotifications(prevNotifications => [...prevNotifications, { id, message, type }]);
    
    // Remove the notification after 15 seconds
    setTimeout(() => removeNotification(id), 15000);
  };

  // Function to remove a notification
  const removeNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  // Polling function to get flight updates
  const pollForUpdates = () => {
    fetch('http://localhost:5002/update')
      .then(response => response.json())
      .then(data => {
        if (data.status !== "No updates available") {
          setFlightData(prevData =>
            prevData.map(flight =>
              flight.flight_number === data.flight_number ? { ...flight, ...data } : flight
            )
          );

          // Use a unique identifier for this update
          const updateId = `${data.flight_number}-${data.timestamp}`;

          // Check if the update is new
          if (!seenUpdates.has(updateId)) {
            addNotification(`Flight ${data.flight_number} updated: ${data.status}`, 'info');
            setSeenUpdates(prevSeenUpdates => new Set(prevSeenUpdates).add(updateId)); // Mark this update as seen
          }
        }
      })
      .catch(error => console.error('Error fetching updates:', error));
  };

  useEffect(() => {
    // Poll every 5 seconds
    const interval = setInterval(pollForUpdates, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Handle flight search form submission
  const handleSearch = (event) => {
    event.preventDefault();

    const payload = {
      departing,
      arriving,
      date,
      flightNumber,
    };

    fetch('http://localhost:5000/search-flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No flights found matching your criteria');
        }
        return response.json();
      })
      .then(data => {
        setFlightData(data);
        setError(null);
      })
      .catch(error => setError(error.message));
  };

  return (
    <Container className="flight-list mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="form-container p-5 rounded shadow-lg">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Check Flight Status</Card.Title>
              <br />
              <Form onSubmit={handleSearch}>
                <Form.Group controlId="departing" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Departing"
                    value={departing}
                    onChange={(e) => setDeparting(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="arriving" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Arriving"
                    value={arriving}
                    onChange={(e) => setArriving(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="date" className="mb-3">
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="flightNumber" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Flight Number (optional)"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit" className="w-50">
                    Search Flight
                  </Button>
                </div>
              </Form>

              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>

          <div className="flight-results mt-4">
            <h3 className="mb-3 text-center">Flight List</h3>
            {flightData.length > 0 ? (
              <ListGroup className="list-group-flush">
                {flightData.map(flight => (
                  <ListGroup.Item key={flight.flight_number} className="flight-item">
                    <Row>
                      <Col>
                        <h5 className="mb-1">{flight.flight_number}</h5>
                        <div style={{ display: 'inline-block' }}>
                          <p className="mb-1">{flight.departing} to {flight.arriving}</p>
                          <p className="mb-1">Terminal {flight.terminal}</p>
                          <p className="mb-1">Gate {flight.gate}</p>
                        </div>
                        <p className="mb-1">Arrival {flight.arrival_time}</p>
                        <p className="mb-1">Departure {flight.departure_time}</p>
                      </Col>
                      <Col xs="auto">
                        <Badge bg={flight.status === 'On Time' ? 'success' : flight.status === 'Warning' ? 'warning' : 'danger'}>
                          {flight.status}
                        </Badge>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Alert variant="info">No flights to show.</Alert>
            )}
          </div>
        </Col>
      </Row>

      <Notification
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </Container>
  );
};

export default FlightList;
