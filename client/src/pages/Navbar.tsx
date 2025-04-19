import { useAuth } from '../context/AuthContext';
import auth from "../utils/auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../index.css";
import "./Navbar.css";

const CustomNavbar = () => {
  const { isLoggedIn, checkLogin } = useAuth();

  const handleLogout = () => {
    auth.logout(false); // Prevent redirection
    checkLogin(); // Update the login state
  };

  return (
    <>
      <nav>
        {!isLoggedIn ? (
          <Navbar expand="lg" bg="light" data-bs-theme="light">
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
                  <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/Landing">Home</NavDropdown.Item>
                    <NavDropdown.Item href="/MpgCalculator">MPG Calculator</NavDropdown.Item>
                    <NavDropdown.Item href="/vin">VIN</NavDropdown.Item>
                    <NavDropdown.Item href="/newComments">Leave a New Comment</NavDropdown.Item>
                    <NavDropdown.Item href="/DisplayComments">Look at All the Comments</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
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
