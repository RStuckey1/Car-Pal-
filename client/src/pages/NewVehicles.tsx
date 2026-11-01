import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle as createVehicleAPI } from '../api/VehicleAPI';
import decodeVin from '../api/VinAPI';
import { VehicleData } from '../interfaces/VehicleData';
import { useAuth } from '../context/AuthContext';
import "./NewVehicles.css"

const NewVehicles = () => {
  const { User: loggedInUser, loading } = useAuth(); // Include loading state from AuthContext
  const navigate = useNavigate();

  const [newVehicles, setNewVehicles] = useState<VehicleData | null>(null); // Initialize as null
  const [vinLookupLoading, setVinLookupLoading] = useState(false);
  const [vinLookupError, setVinLookupError] = useState('');

  // Initialize the newVehicles state once loggedInUser is available
  useEffect(() => {
    if (!loading && loggedInUser) {
      setNewVehicles({
        id: 2,
        vin: '',
        make: '',
        model: '',
        year: 0,
        miles: 0,
        color: '',
        price: 0,
        UserId: loggedInUser.id, // Assign the logged-in user's ID
      });
    }
  }, [loggedInUser, loading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newVehicles) return;
    try {
      const data = await createVehicleAPI(newVehicles);
      console.log('Vehicle created:', data);
      // Redirect to NewGasEntry with VehicleId and miles as state
      navigate('/DisplayVehicles', { state: { VehicleId: data.id, initialMiles: data.miles } });
    } catch (err) {
      console.error('Failed to create vehicle:', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'vin') {
      setVinLookupError('');
    }
    setNewVehicles((prev) => prev && ({
      ...prev,
      [name]: name === 'year' || name === 'miles' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleVinLookup = async () => {
    if (!newVehicles) return;

    setVinLookupLoading(true);
    setVinLookupError('');
    try {
      const vehicle = await decodeVin(newVehicles.vin);
      setNewVehicles((prev) => prev && ({
        ...prev,
        vin: newVehicles.vin.trim().toUpperCase(),
        make: vehicle.make,
        model: vehicle.model,
        ...(vehicle.year !== null ? { year: vehicle.year } : {}),
      }));
    } catch (err) {
      setVinLookupError(err instanceof Error ? err.message : 'VIN lookup failed.');
    } finally {
      setVinLookupLoading(false);
    }
  };

  if (loading || !newVehicles) {
    // Show a loading indicator or nothing while loading
    return <p>Loading...</p>;
  }

  return (
    <div className="container-newVehicle">
      <h2>Enter New Vehicle</h2>
      <button className='backtovehicles' onClick={() => navigate('/DisplayVehicles')}>Back to Vehicles</button>
      <form className="form-newVehicle" onSubmit={handleSubmit}>
        <div className="label">
          <label htmlFor="vin">VIN</label>
          <input
            type="text"
            id="vin"
            name="vin"
            value={newVehicles.vin}
            onChange={handleChange}
            maxLength={17}
            autoCapitalize="characters"
          />
          <button
            type="button"
            className="lookupVinButton"
            onClick={handleVinLookup}
            disabled={vinLookupLoading}
          >
            {vinLookupLoading ? 'Looking up...' : 'Find vehicle'}
          </button>
          {vinLookupError && <p className="vinLookupError" role="alert">{vinLookupError}</p>}
        </div>
        <div className="label">
          <label htmlFor="make">Make</label>
          <input
            type="text"
            id="make"
            name="make"
            value={newVehicles.make}
            onChange={handleChange}
          />
        </div>
        <div className="label">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={newVehicles.model}
            onChange={handleChange}
          />
        </div>
        <div className="label">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={newVehicles.year}
            onChange={handleChange}
          />
        </div>
        <div className="label">
          <label htmlFor="miles">Miles</label>
          <input
            type="number"
            id="miles"
            name="miles"
            value={newVehicles.miles}
            onChange={handleChange}
          />
        </div>
        <div className="label">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={newVehicles.color}
            onChange={handleChange}
          />
        </div>
        <div className="label">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newVehicles.price}
            onChange={handleChange}
          />
        </div>
        <button className="newVehicleButton" type="submit">Submit Vehicle</button>
      </form>
    </div>
  );
};

export default NewVehicles;
