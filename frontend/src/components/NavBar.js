import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import './NavBar.css'


function NavBar() {
  return (
    
    <>
   
           <Navbar bg="opaque" className="navbar-indigo fixed-top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/image001.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      
    </>
  );
}

export default NavBar;