import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { retrieveGasByVehicle, deleteGas } from '../api/gasAPI';
import './DisplayRecords.css'

type GasData = {
  id: number;
  date: string;
  starting_miles: number;
  current_miles: number;
  gallons_gas: number;
  mpg: number;
  gas_price: number;
  VehicleId: number;
};

const DisplayRecords: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [gasEntries, setGasEntries] = useState<GasData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Defensive: handle missing state gracefully
  let make = '';
  let model = '';
  if (location.state && typeof location.state === 'object') {
    make = (location.state as any).make || '';
    model = (location.state as any).model || '';
  }

  useEffect(() => {
    if (vehicleId) {
      retrieveGasByVehicle(Number(vehicleId)).then(setGasEntries);
    }
  }, [vehicleId]);

  // Add delete handler
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await deleteGas(id);
      setGasEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  return (
    <div className='display-records'>
      <h2>
        Gas Entries for {make && model ? `${make} ${model}` : 'Vehicle'}
      </h2>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1em' }}>
        Back
      </button>
      {gasEntries.length === 0 ? (
        <p>No gas entries found for this vehicle.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Starting Miles</th>
              <th>Current Miles</th>
              <th>Gallons</th>
              <th>MPG</th>
              <th>Gas Price</th>
              <th>Delete</th> {/* Add Delete column */}
            </tr>
          </thead>
          <tbody>
            {gasEntries.map(entry => (
              <tr key={entry.id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.starting_miles}</td>
                <td>{entry.current_miles}</td>
                <td>{entry.gallons_gas}</td>
                <td>{entry.mpg}</td>
                <td>{entry.gas_price}</td>
                <td>
                  <button onClick={() => handleDelete(entry.id)}>
                    Delete it
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayRecords;