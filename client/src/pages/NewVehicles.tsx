import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle as createVehicleAPI } from '../api/VehicleAPI';
import { VehicleData } from '../interfaces/VehicleData';
import { useAuth } from '../context/AuthContext';

const NewVehicles = () => {
  const { user: loggedInUser } = useAuth(); // Ensure 'user' exists in AuthContextType
  const navigate = useNavigate();

  const [newVehicles, setNewVehicles] = useState<VehicleData>({
    id: 0,
    vin: '',
    make: '',
    model: '',
    year: 0,
    miles: 0,
    color: '',
    price: 0,
    UserId: loggedInUser?.id || 0, // Automatically assign the logged-in user's ID
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await createVehicleAPI(newVehicles);
      console.log('Vehicle created:', data);
      navigate('/Landing'); // Redirect to the landing page after successful creation
    } catch (err) {
      console.error('Failed to create vehicle:', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewVehicles((prev) => ({
      ...prev,
      [name]: name === 'year' || name === 'miles' || name === 'price' ? Number(value) : value,
    }));
  };

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

        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default NewVehicles;
