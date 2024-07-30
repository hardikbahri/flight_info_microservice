// src/App.js
import React from 'react';
import FlightList from './components/FlightList';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import other components as needed

const App = () => {
  return (
    
    <div className="App">
      <NavBar></NavBar>
      
      <FlightList />
      {/* Add other components like FlightDetail, FlightForm here */}
    </div>
  );
};

export default App;
