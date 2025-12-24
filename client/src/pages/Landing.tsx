import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './Landing.css';

const Landing = () => {
  const { isLoggedIn } = useAuth();

  return (

    <div className="landing">
      {!isLoggedIn ? (
        <div className="container">
          <h1>Welcome to Car-Pal!</h1>
          <h1>A place to remind you that your car needs you.</h1>
          <h3>Just add simple data and the app will do the rest. Maintenance reminders, Miles Per Gallon, Cost of Ownership, and More.</h3>
          <h3>To get started, please login or create an account</h3>
          <ButtonGroup aria-label="loginbutton" size="lg">
            <Button variant="secondary" size="lg"><Link to="/login">Login</Link></Button>
            <Button variant="secondary" size="lg"><Link to="/signup">New User</Link></Button>
          </ButtonGroup>
        </div>
      ) : (
        <>
          <div className="welcome">
            <h1>Welcome to Car-Pal!</h1>
          </div>
          <div className="links">
            <h3><Link to="/DisplayVehicles">Your Vehicles</Link></h3>
            <h3><Link to="/NewVehicles">Enter a New Vehicle</Link></h3>
          </div>
        </>
      )}
    </div>

  );
};

export default Landing;