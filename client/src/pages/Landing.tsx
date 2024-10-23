import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUser } from '../api/userAPI';
import { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
import { Link } from 'react-router-dom';
import './Landing.css';


const Landing = () => {
    const [user, setUser] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
  
    useEffect(() => {
      if (loginCheck) {
        fetchUser();
      }
    }, [loginCheck]);
  
    useLayoutEffect(() => {
      checkLogin();
    }, []);
  
    const checkLogin = () => {
      if (auth.loggedIn()) {
        setLoginCheck(true);
      }
    };
  
    const fetchUser = async () => {
      try {
        const data = await retrieveUser();
        setUser(data);
        console.log(user);
      } catch (err) {
        console.error("Failed to retrieve tickets:", err);
        setError(true);
      }
    };
  
    if (error) {
      return <ErrorPage />;
    }
    return (
      <>
            <div>
            <h1>Welcome to the Car Maintenance Tracker!</h1>
            <h1>A place to keep track of all your car maintenance needs.</h1>
            <section>
              <h3><Link to="/VIN">VIN</Link></h3>
              <h3><Link to="/MpgCalculator">MpgCalculator</Link></h3>
              <h3><Link to="/NewComments">Click to Make Comments</Link></h3>
              <h3><Link to="/DisplayComments">Click to Display Comments</Link></h3>
            </section>
          </div>
      </>
    );
  }

export default Landing;