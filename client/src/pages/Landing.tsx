import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Landing.css';



function Landing() {

  const [isLoggedIn] = useState(true);

  return (
  isLoggedIn ? (
      <div>
        <h1>Welcome to the Car Maintenance Tracker!</h1>
        <h1>A place to keep track of all your car maintenance needs.</h1>
        <section>
           
        <h3><Link to="/Login">Login</Link></h3>      
        <h3><Link to="/VIN">VIN</Link></h3>
        <h3><Link to="/MpgCalculator">MpgCalculator</Link></h3>
        </section>
      </div>
    ) : <h2>No User Authorized</h2> 
  );
  }

  /*
  return (
    <>
<body>
    <div className="landing-body"> 
      <h1>Welcome to Car Maintenance Tracker!</h1>
      <h1>A place to keep track of all your car maintenance needs.</h1>

    <ul className='landing-list'>
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
*/

export default Landing;