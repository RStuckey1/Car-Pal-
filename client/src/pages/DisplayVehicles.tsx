import React, { useState, useEffect } from 'react';
import { retrieveVehicles, deleteVehicle } from '../api/VehicleAPI';
import { useAuth } from '../context/AuthContext';
import './DisplayVehicles.css'; // Import your CSS file for styling

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  miles: number;
  price: number;
  UserId: number | null; 
  User?: { username: string }; // Optional User object
}

const DisplayVehicles: React.FC = () => {
  const { User } = useAuth(); // Get the logged-in user
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (!User?.id) {
      console.error('User is not logged in or UserId is missing');
      return;
    }
    retrieveVehicles()
      .then((data) => {
        // Filter vehicles by the logged-in user's ID
        const userVehicles = data.filter((vehicle: Vehicle) => vehicle.UserId === User?.id);
        setVehicles(userVehicles);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  }, [User?.id]); // Re-run if the logged-in user's ID changes

  const handleDelete = async (vehicleId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this vehicle?');
    if (!confirmed) return;
    try {
      await deleteVehicle(vehicleId);
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== vehicleId));
      console.log(`Vehicle with ID ${vehicleId} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
    }
  };

  return (
    <div className="display-vehicles">
      <h1>Your Vehicles</h1>
      {vehicles.length > 0 ? (
        <ul className="vehicle-list">
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              Year:{vehicle.year} Make: {vehicle.make} Model:{vehicle.model} Color: {vehicle.color} Miles: {vehicle.miles} <br></br>
              Price:${vehicle.price} {vehicle.User && (
                <span>Owner: {vehicle.User.username}</span>
              )}
              <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vehicles found for your account.</p>
      )}
    </div>
  );
};

export default DisplayVehicles;