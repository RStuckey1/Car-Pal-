import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUser } from '../api/userAPI';
import { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
import auth from "../utils/auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../index.css";
import "./Navbar.css";

const CustomNavbar = () => {
  const [user, setUser] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    if (loginCheck) {
      fetchUser();
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await retrieveUser();
      setUser(data);
      console.log(user);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }
  return (
  <>
    <nav>
    {!loginCheck ? (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar>
        <Navbar.Brand href="/Landing">Car Pal Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
        </Nav>
      
        </Navbar>
        </Container>
        </Navbar>
                  ) : (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>      
        <Navbar>
        <Navbar.Brand href="/Landing">Car Pal Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Landing">Home</NavDropdown.Item>
            <NavDropdown.Item href="/MpgCalculator">MPG Calculator</NavDropdown.Item>
            <NavDropdown.Item href="/vin">VIN</NavDropdown.Item>
            <NavDropdown.Item href="/newComments">Leave a New Comment</NavDropdown.Item>
            <NavDropdown.Item href="/DisplayComments">Look at All the Comments</NavDropdown.Item>
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        </Navbar>
        </Container>
        </Navbar>
                  )}
                
              
            
       </nav>
     </>
   
  );
};
  


export default CustomNavbar;
