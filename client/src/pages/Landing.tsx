import { Link } from 'react-router-dom';
// import React from 'react';
import Footer from './Footer';
import './Landing.css';



function Landing() {
  return (
    <>
<body>
    <div className="landing-body"> 
      <h1>Welcome to Car Maintenance Tracker!</h1>
      <h1>A place to keep track of all your car maintenance needs.</h1>

    <ul className='landing-list'>
      <Link to="/Home">Home</Link>
      <Link to="/Login">Login</Link>
      <Link to="/VIN">VIN</Link>
      <Link to="/MpgCalculator">MpgCalculator</Link>
    </ul>
    </div>
</body>





    <Footer />
    </>
  );
}

export default Landing;