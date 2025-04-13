import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import auth from "../utils/auth";
import "../index.css";
import "./Navbar.css";

const CustomNavbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <nav>
           <h1>Car Pal Tracker</h1>
          {" "}
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          </button>
          <h1>
          <div className="navbar-collapse">
            <ul className="navbar">
              <li className="navbar">
                  {!loginCheck ? (
                    <button className="btn" type="button">

                      <NavLink to="/login">Login</NavLink>
                     
                    </button>
                  ) : (
                    <button
                      className="btn"
                      type="button"
                      id="logout"
                      onClick={() => {
                        auth.logout();
                      }}
                    >
                      Logout
                    </button>
                  )}
                
              </li>
              <li className="nav-item">
                <div>
                  <button className="btn" type="button">
                    <NavLink to="/Landing">Home Page</NavLink>
                  </button>
                </div>
              </li>
              <li className="nav-item">
                <button className="btn" type="button">
                  <NavLink to="/MpgCalculator">MPG Calculator</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn" type="button">
                  <NavLink to="/NewComments">Leave a New Comment</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn" type="button">
                  <NavLink to="/CommentsList">Look at All the Comments</NavLink>
                </button>
              </li>
            </ul>
          </div>
          </h1>
       
      </nav>
  );
};

export default CustomNavbar;
