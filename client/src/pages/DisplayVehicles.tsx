import React, { useState, useEffect } from 'react';
import { retrieveVehicles, deleteVehicle } from '../api/VehicleAPI';
import { useAuth } from '../context/AuthContext';
import NewGasEntry from './NewGasEntry';
import { useNavigate } from 'react-router-dom'; // <-- Add this import
import './DisplayVehicles.css'; // Import your CSS file for styling
import { retrieveGasByVehicle } from '../api/gasAPI'; // Import the API function to retrieve gas entries

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
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [latestMiles, setLatestMiles] = useState<{ [vehicleId: number]: number | null }>({});
  const navigate = useNavigate(); // <-- Add this line

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

  interface GasEntry {
    id: number;
    date: string;
    current_miles: number;
    // add other properties if needed
  }

  useEffect(() => {
    if (vehicles.length > 0) {
      vehicles.forEach(async (vehicle) => {
        // Fetch gas entries for this vehicle
        const gasEntries: GasEntry[] = await retrieveGasByVehicle(vehicle.id);
        if (gasEntries && gasEntries.length > 0) {
          // Find the newest entry (assuming sorted by date descending, otherwise sort)
          const newest = gasEntries.reduce((a, b) =>
            new Date(a.date) > new Date(b.date) ? a : b
          );
          setLatestMiles((prev) => ({ ...prev, [vehicle.id]: newest.current_miles }));
        } else {
          setLatestMiles((prev) => ({ ...prev, [vehicle.id]: null }));
        }
      });
    }
  }, [vehicles]);

  const handleDelete = async (VehicleId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this vehicle?');
    if (!confirmed) return;
    try {
      await deleteVehicle(VehicleId);
      setVehicles((prevVehicles) => prevVehicles.filter((Vehicle) => Vehicle.id !== VehicleId));
      console.log(`Vehicle with ID ${VehicleId} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
    }
  };

  const handleExpand = (VehicleId: number) => {
    setExpandedId(expandedId === VehicleId ? null : VehicleId);
  };

  return (
    <div className="display-vehicles">
      <h1>Your Vehicles</h1>
      <button className="addVehicle" onClick={() => navigate('/NewVehicles')} style={{marginBottom: '1em'}}>
        Add New Vehicle
      </button>
      
      {vehicles.length > 0 ? (
        <ul className="vehicle-list">
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              <div className="vehicle-summary" onClick={() => handleExpand(vehicle.id)} style={{cursor: 'pointer'}}>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </div>
              {expandedId === vehicle.id && (
                            <>
                              <div className="vehicle-details">
                                  <p>Color: {vehicle.color}</p>
                                  <p>Initial Miles: {vehicle.miles}</p>
                                  <p>Price: ${vehicle.price}</p>         
                                  {vehicle.User && <p>Owner: {vehicle.User.username}</p>}
                                  <p>
                                    Latest Odometer:{" "}
                                    {latestMiles[vehicle.id] !== undefined && latestMiles[vehicle.id] !== null
                                      ? latestMiles[vehicle.id]
                                      : "No gas entries yet"}
                                  </p>
                                  <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                                  <button
                                    onClick={() =>
                                      navigate(`/DisplayRecords/${vehicle.id}`, {
                                        state: { make: vehicle.make, model: vehicle.model }
                                      })
                                    }                                   
                                  >
                                    View Gas Records
                                  </button>
                                   <button
                                    onClick={() =>
                                      navigate(`/NewMaintenance`, {
                                        state: { VehicleId: vehicle.id }
                                      })
                                    }
                                  >
                                    New Maintenance
                                  </button>
                              </div>    
                              <div className="newestGas">
                                    <NewGasEntry VehicleId={vehicle.id} />
                              </div>
                            </>
                            )}
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