import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className={`landing${isLoggedIn ? ' landing--signed-in' : ''}`}>
      {!isLoggedIn ? (
        <section className="landing-hero">
          <div className="landing-copy">
            <span className="eyebrow">VEHICLE CARE, MADE SIMPLE</span>
            <h1>Every vehicle.<br />One clear picture.</h1>
            <p className="landing-lede">
              Keep service, fuel, and mileage together, whether you’re tracking one car or several vehicles.
            </p>
            <div className="landing-actions">
              <Link className="landing-primary" to="/signup">Get started</Link>
              <Link className="landing-secondary" to="/login">I already have an account</Link>
            </div>
            <p className="landing-note">Quick to update from the driver’s seat. Easy to review whenever you need it.</p>
          </div>
          <div className="landing-preview" aria-label="Vehicle care overview">
            <div className="preview-topline">
              <span className="preview-dot" />
              <span>YOUR GARAGE</span>
              <span className="preview-live">ALL IN ONE PLACE</span>
            </div>
            <div className="preview-car">
              <span className="preview-car-icon" aria-hidden="true">↗</span>
              <div>
                <strong>Vehicle care, organized</strong>
                <span>Fuel logs · Service · Mileage</span>
              </div>
            </div>
            <div className="preview-stats">
              <div><span>FUEL</span><strong>Track every fill-up</strong></div>
              <div><span>SERVICE</span><strong>Stay ahead of upkeep</strong></div>
            </div>
            <div className="preview-footer"><span>ONE OR MANY VEHICLES</span><span>BUILT AROUND YOUR DRIVE</span></div>
          </div>
        </section>
      ) : (
        <section className="landing-dashboard">
          <span className="eyebrow">YOUR GARAGE</span>
          <h1>Good to see you.</h1>
          <p>Pick up where you left off, or add a vehicle to get started.</p>
          <div className="dashboard-actions">
            <Link className="dashboard-card" to="/DisplayVehicles">
              <span className="dashboard-icon" aria-hidden="true">↗</span>
              <span><strong>Your vehicles</strong><small>Review mileage, fuel, and service</small></span>
              <span className="dashboard-arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="dashboard-card dashboard-card--accent" to="/NewVehicles">
              <span className="dashboard-icon" aria-hidden="true">＋</span>
              <span><strong>Add a vehicle</strong><small>Start tracking another vehicle</small></span>
              <span className="dashboard-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Landing;