import React, { useState, useEffect } from 'react';
import { retrieveVehicles, deleteVehicle } from '../api/VehicleAPI';
import { useAuth } from '../context/AuthContext';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  miles: number;
  price: number;
  UserId: number | null; // foreign key to User
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
    try {
      await deleteVehicle(vehicleId);
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== vehicleId));
      console.log(`Vehicle with ID ${vehicleId} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
    }
  };

  return (
    <div>
      <h1>Your Vehicles</h1>
      {vehicles.length > 0 ? (
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              {vehicle.make} - {vehicle.model} - {vehicle.year} - {vehicle.color} - {vehicle.miles} miles - ${vehicle.price}
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