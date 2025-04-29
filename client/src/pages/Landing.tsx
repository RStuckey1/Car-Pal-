import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="landing">
      {!isLoggedIn ? (
      <div className="container">
        <h1>Welcome to the Car Maintenance Tracker!</h1>
        <h1>A place to keep track of all your car maintenance needs.</h1>
        <h3>Login to track or click new user to start</h3>
     
     
       
          <>
            <button className="landbtn" type="button">
              <h3><Link to="/login">Login</Link></h3>
            </button>
            <button className="landbtn" type="button">
              <h3><Link to="/signup">New User</Link></h3>
            </button>
          </>
        </div>
        ) : (
          <div className="links">
            <h1>Welcome to the Car Maintenance Tracker!</h1>
            <h3><Link to="/VIN">VIN</Link></h3>
            <h3><Link to="/NewVehicles">Add New Vehicle</Link></h3>
            <h3><Link to="/MpgCalculator">MpgCalculator</Link></h3>
            <h3><Link to="/NewComments">Click to Make Comments</Link></h3>
            <h3><Link to="/DisplayComments">Click to Display Comments</Link></h3>
          </div>
        )}
      </div>
    
  );
};

export default Landing;