import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from "../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import Navbar from 'react-bootstrap/Navbar';
import "../index.css";

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
    <Navbar expand="lg" className="bg-body-tertiary">
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
    <div className="display-flex justify-space-between align-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark align-center">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            style={{ display: "flex", gap: "30px", paddingLeft: "15px" }}

          >
           <h1>Car Pal Tracker</h1>
          </a>{" "}
          <span className="navbar-text">
            <h1>Today is the day to love your car!!</h1>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <div style={{ display: "flex", gap: "20px" }}>
                  {!loginCheck ? (
                    <button className="btn" type="button">

                      <Link to="/login">Login</Link>
                     
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
                </div>
              </li>
              <li className="nav-item">
                <div>
                  <button className="btn" type="button">
                    <Link to="/Landing">Home Page</Link>
                  </button>
                </div>
              </li>
              <li className="nav-item">
                <button className="btn" type="button">
                  <Link to="/MpgCalculator">MPG Calculator</Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn" type="button">
                  <Link to="/NewComments">Leave a New Comment</Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn" type="button">
                  <Link to="/CommentsList">Look at All the Comments</Link>
                </button>
              </li>
            </ul>
          </div>
          </h1>
        </div>
      </nav>
    </div>
    </Navbar.Collapse>
    
    </Navbar>
  );
};

export default CustomNavbar;
