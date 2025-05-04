import { useAuth } from '../context/AuthContext';
import auth from "../utils/auth";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../index.css";
import "./Navbar.css";

const CustomNavbar = () => {
  const { isLoggedIn, checkLogin, User, loading } = useAuth(); // Include loading state
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    auth.logout(false); // Prevent redirection by AuthService
    checkLogin(); // Update the login state
    navigate('/Landing'); // Redirect to the landing page
  };

  if (loading) {
    // Show a loading indicator or nothing while loading
    return null;
  }

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
                  <NavDropdown title={`Welcome, ${User?.username || 'User'}`} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/Landing">Home</NavDropdown.Item>
                    <NavDropdown.Item href="/MpgCalculator">MPG Calculator</NavDropdown.Item>
                    <NavDropdown.Item href="/NewVehicles">Add a New Vehicle</NavDropdown.Item>
                    <NavDropdown.Item href="/vin">VIN</NavDropdown.Item>
                    <NavDropdown.Item href="/newComments">Leave a New Comment</NavDropdown.Item>
                    <NavDropdown.Item href="/DisplayComments">Look at All the Comments</NavDropdown.Item>
                    <NavDropdown.Item href="/DisplayVehicles">Look at All the Vehicles</NavDropdown.Item>
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
