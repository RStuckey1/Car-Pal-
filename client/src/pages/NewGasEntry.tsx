import { useState, useEffect } from 'react';
import { retrieveVehicles } from '../api/VehicleAPI';
import { createGas } from '../api/gasAPI';
import { useAuth } from '../context/AuthContext';

type Vehicle = {
  id: number;
  make: string;
  model: string;
  year: number;
  UserId: number;
};

type GasForm = {
  date: string;
  starting_miles: number;
  current_miles: number;
  gallons_gas: number;
  mpg: number;
  gas_price: number;
  VehicleId: number;
};

// Accept vehicleId as a prop
const NewGasEntry = ({ VehicleId }: { VehicleId?: number }) => {
  const { User } = useAuth();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  // Removed unused selectedVehicleId state
  const [form, setForm] = useState<GasForm>({
    date: '',
    starting_miles: 0,
    current_miles: 0,
    gallons_gas: 0,
    mpg: 0,
    gas_price: 0,
    VehicleId: VehicleId ?? 0,
  });

  // Fetch user's vehicles only if not provided
  useEffect(() => {
    if (User?.id && !VehicleId) {
      retrieveVehicles().then(data => setVehicles(data.filter((v: Vehicle) => v.UserId === User.id)));
    }
  }, [User, VehicleId]);



  // If vehicleId is passed as prop, always use it
  useEffect(() => {
    if (VehicleId) {
      setForm(f => ({ ...f, VehicleId }));
    }
  }, [VehicleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === 'VehicleId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const mpg = (form.current_miles - form.starting_miles) / form.gallons_gas;
    const gasData = {
      ...form,
      date: new Date(form.date),
      mpg: mpg,
    };
    await createGas(gasData);
    // Optionally redirect or clear form
  };

  return (
    <form onSubmit={handleSubmit}>
      {!VehicleId && (
        <label>
          Vehicle:
          <select name="vehicleId" value={form.VehicleId} onChange={handleChange} required>
            <option value="">Select Vehicle</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.make} {v.model} ({v.year})
              </option>
            ))}
          </select>
        </label>
      )}
      <label>
        Date:
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
      </label>
      <label>
        Current Miles:
        <input type="number" name="current_miles" value={form.current_miles} onChange={handleChange} required />
      </label>
      <label>
        Gallons Gas:
        <input type="number" name="gallons_gas" value={form.gallons_gas} onChange={handleChange} required />
      </label>
      <label>
        Gas Price:
        <input type="number" name="gas_price" value={form.gas_price} onChange={handleChange} required />
      </label>
      <button type="submit">Add Gas Entry</button>
     
    </form>
  );
};

export default NewGasEntry;