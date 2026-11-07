import { useAuth } from '../context/AuthContext';
import auth from "../utils/auth";
import carpic from "../assets/car1.png"
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
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
          <div className="navbar-logo">
            <img src={carpic} alt="carlogopicture"></img>
            <ul className="logo">
              <li><Link to="/Landing">Car-Pal</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          </div>
        ) : (
          <div className="navbar-logo">
            <img src={carpic} alt="carlogopicture"></img>
            <h1>{`Welcome, ${User?.username || 'User'}`}</h1>
            <ul>
              <li className="dropdown">
              <a href="javascript:void(0)" className="dropbtn">Menu</a>
              <div className="dropdown-content">
              <a href="#"><Link to="/Landing">Home</Link></a>
              <a href="#"><Link to="/DisplayVehicles">Your Vehicles</Link></a>
              <a href="#"><Link to="/NewVehicles">Enter a New Vehicle</Link></a>
              <a href="#"><button onClick={handleLogout}>Logout</button></a>
              </div>
              </li>
            </ul>
            <Link to="/Preferences" className="navbar-preferences" aria-label="Preferences" title="Preferences">
           <FontAwesomeIcon icon={faGear} style={{color: "rgb(255, 0, 0)",}} />
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default CustomNavbar;
