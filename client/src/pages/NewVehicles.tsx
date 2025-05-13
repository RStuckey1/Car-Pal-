import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle as createVehicleAPI } from '../api/VehicleAPI';
import { VehicleData } from '../interfaces/VehicleData';
import { useAuth } from '../context/AuthContext';

const NewVehicles = () => {
  const { User: loggedInUser, loading } = useAuth(); // Include loading state from AuthContext
  const navigate = useNavigate();

  const [newVehicles, setNewVehicles] = useState<VehicleData | null>(null); // Initialize as null

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
    if (!newVehicles) return; // Prevent submission if state is not initialized
    try {
      const data = await createVehicleAPI(newVehicles);
      console.log('Vehicle created:', data);
      navigate('/DisplayVehicles'); // Redirect to the landing page after successful creation
    } catch (err) {
      console.error('Failed to create vehicle:', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewVehicles((prev) => prev && ({
      ...prev,
      [name]: name === 'year' || name === 'miles' || name === 'price' ? Number(value) : value,
    }));
  };

  if (loading || !newVehicles) {
    // Show a loading indicator or nothing while loading
    return <p>Loading...</p>;
  }

  return (
    <div className="container-newVehicle">
      <form onSubmit={handleSubmit}>
        <label htmlFor="vin">VIN</label>
        <input
          type="text"
          id="vin"
          name="vin"
          value={newVehicles.vin}
          onChange={handleChange}
        />

        <label htmlFor="make">Make</label>
        <input
          type="text"
          id="make"
          name="make"
          value={newVehicles.make}
          onChange={handleChange}
        />

        <label htmlFor="model">Model</label>
        <input
          type="text"
          id="model"
          name="model"
          value={newVehicles.model}
          onChange={handleChange}
        />

        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          value={newVehicles.year}
          onChange={handleChange}
        />

        <label htmlFor="miles">Miles</label>
        <input
          type="number"
          id="miles"
          name="miles"
          value={newVehicles.miles}
          onChange={handleChange}
        />

        <label htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          name="color"
          value={newVehicles.color}
          onChange={handleChange}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={newVehicles.price}
          onChange={handleChange}
        />

        <button type="submit">Submit Vehicle</button>
      </form>
    </div>
  );
};

export default NewVehicles;
