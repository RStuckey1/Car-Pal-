import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './Landing.css';



function Landing() {
  return (
    <>
    <Navbar />
<body>
    <div className="landing-body"> Welcome to Car Maintenance Tracker! A place to keep track of all your car maintenance needs.

    
    <Link to="/Home">Home</Link>
    <Link to="/Login">Login</Link>
    <Link to="/VIN">VIN</Link>
    </div>
</body>





    <Footer />
    </>
  );
}

export default Landing;