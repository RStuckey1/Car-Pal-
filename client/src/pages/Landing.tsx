import Navbar from '../components/Navbar';
import Home from './Home';
import Footer from './Footer';
import './Landing.css';



function Landing() {
  return (
    <>
    <Navbar />
<body>
    <div className="landing-body"> Welcome to Car Maintenance Tracker! A place to keep track of all your car maintenance needs.

    </div>
    <Home />
</body>





    <Footer />
    </>
  );
}

export default Landing;