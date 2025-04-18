import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <div>
        <h1>Welcome to the Car Maintenance Tracker!</h1>
        <h1>A place to keep track of all your car maintenance needs.</h1>
        <h2>Login to track or click new user to start</h2>
      </div>
      <div className="start">
        {!isLoggedIn ? (
          <>
            <button className="btn" type="button">
              <Link to="/login">Login</Link>
            </button>
            <button className="btn" type="button">
              <Link to="/signup">New User</Link>
            </button>
          </>
        ) : (
          <div className="links">
            <h3><Link to="/VIN">VIN</Link></h3>
            <h3><Link to="/MpgCalculator">MpgCalculator</Link></h3>
            <h3><Link to="/NewComments">Click to Make Comments</Link></h3>
            <h3><Link to="/DisplayComments">Click to Display Comments</Link></h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;