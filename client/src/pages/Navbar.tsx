import { useAuth } from '../context/AuthContext';
import auth from "../utils/auth";
import carpic from "../assets/car1.png";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

const CustomNavbar = () => {
  const { isLoggedIn, checkLogin, User, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(false);
    checkLogin();
    navigate('/Landing');
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link className="brand" to="/Landing">
        <img src={carpic} alt="" />
        <span>Car-Pal</span>
      </Link>
      <div className="nav-actions">
        {isLoggedIn ? (
          <>
            <span className="nav-greeting">
              Hi, {[User?.firstName, User?.lastName].filter(Boolean).join(' ') || User?.username || 'there'}
            </span>
            <Link className="nav-link" to="/DisplayVehicles">Vehicles</Link>
            <Link className="nav-link" to="/NewVehicles">Add vehicle</Link>
            <Link className="nav-link" to="/Preferences">Settings</Link>
            <button className="nav-logout" type="button" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Log in</Link>
            <Link className="nav-signup" to="/signup">Create account</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
