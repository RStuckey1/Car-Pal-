import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { retrieveVehicles } from '../api/VehicleAPI';
import { createVehicleMaintenance, retrieveMaintenanceByVehicle, deleteVehicleMaintenance, updateVehicleMaintenance } from '../api/maintenanceAPI';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './NewMaintenanceEntry.css';

type Vehicle = {
  id: number;
  make: string;
  model: string;
  year: number;
  UserId: number;
};

type MaintenanceForm = {
  mileage_due: number;
  maintenance_title: string;
  maintenance_description: string;
  parts_needed: string;
  cost: number;
  time_spent: number;
  completed: boolean; // <-- Add this line
  VehicleId: number;
};

type MaintenanceRecord = {
  id: number;
  mileage_due: number;
  maintenance_title: string;
  maintenance_description: string;
  parts_needed: string;
  cost: number;
  time_spent: number;
  VehicleId: number;
  completed?: boolean; // <-- Add this line
};

const NewMaintenanceEntry = ({ VehicleId: propVehicleId }: { VehicleId?: number }) => {
  const { User } = useAuth();
  const location = useLocation();
  const VehicleId = propVehicleId ?? location.state?.VehicleId ?? 0;
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [form, setForm] = useState<MaintenanceForm>({
    mileage_due: 0,
    maintenance_title: '',
    maintenance_description: '',
    parts_needed: '',
    cost: 0,
    time_spent: 0,
    completed: false, // <-- Add this line
    VehicleId,
  });
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);

  // Fetch user's vehicles only if not provided
  useEffect(() => {
    if (User?.id && !VehicleId) {
      retrieveVehicles().then(data => setVehicles(data.filter((v: Vehicle) => v.UserId === User.id)));
    }
  }, [User, VehicleId]);

  // If vehicleId is passed as prop or via state, always use it
  useEffect(() => {
    if (VehicleId) {
      setForm(f => ({ ...f, VehicleId }));
      // Fetch maintenance records for this vehicle
      retrieveMaintenanceByVehicle(VehicleId).then(setMaintenanceRecords);
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
    const maintenanceData = {
      ...form,
      mileage_due: Number(form.mileage_due),
    };
    await createVehicleMaintenance(maintenanceData);
    // Refresh maintenance records after adding
    if (VehicleId) {
      retrieveMaintenanceByVehicle(VehicleId).then(setMaintenanceRecords);
    }
    // Optionally clear form
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await deleteVehicleMaintenance(id);
      setMaintenanceRecords(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleMarkComplete = async (id: number) => {
    // Find the record
    const record = maintenanceRecords.find(r => r.id === id);
    if (!record) return;
    // Update the record as completed
    await updateVehicleMaintenance(id, { ...record, completed: true });
    // Update local state
    setMaintenanceRecords(prev =>
      prev.map(r => (r.id === id ? { ...r, completed: true } : r))
    );
  };

  const handleMarkIncomplete = async (id: number) => {
    const record = maintenanceRecords.find(r => r.id === id);
    if (!record) return;
    await updateVehicleMaintenance(id, { ...record, completed: false });
    setMaintenanceRecords(prev =>
      prev.map(r => (r.id === id ? { ...r, completed: false } : r))
    );
  };

  // Find the selected vehicle details
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined);

  useEffect(() => {
    if (form.VehicleId && vehicles.length > 0) {
      setSelectedVehicle(vehicles.find(v => v.id === form.VehicleId));
    } else if (form.VehicleId && vehicles.length === 0) {
      // Fetch the vehicle directly if not in vehicles array
      retrieveVehicles().then(data => {
        const found = data.find((v: Vehicle) => v.id === form.VehicleId);
        setSelectedVehicle(found);
      });
    }
  }, [form.VehicleId, vehicles]);

  return (
    <div className="newMaintenanceEntry">
      <h2>
        Maintenance for{' '}
        {selectedVehicle
          ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
          : 'Vehicle'}
      </h2>
      <button onClick={() => navigate('/DisplayVehicles')}>
        Back to Vehicles
      </button>
      <div className="vehicle-info">
        <form onSubmit={handleSubmit}>
          {!VehicleId && (
            <label>
              Vehicle:
              <select name="VehicleId" value={form.VehicleId} onChange={handleChange} required>
                <option value="">Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.make} {v.model} ({v.year})
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="maintenance_form">
          <div className="long-label">
          <label className="maintenance_title" id="maintenance_title">
            Maintenance Title:
          </label>
          <input type="text" id="maintenance_title" name="maintenance_title" value={form.maintenance_title} onChange={handleChange} required />
         
          <label className="maintenance_description" id="maintenance_description">
            Maintenance Description:
          </label>
            <input type="text" id="maintenance_description" name="maintenance_description" value={form.maintenance_description} onChange={handleChange} required />
          <label className="parts_needed" id="parts_needed">
            Parts Needed:
          </label>
            <input type="text" id="parts_needed" name="parts_needed" value={form.parts_needed} onChange={handleChange} required />
          </div>
          <div className="short-label">
          <label>
            Cost($):
            <input type="number" name="cost" value={form.cost} onChange={handleChange} required />
          </label>
          <label>Mileage Due:
            <input type="number" name="mileage_due" value={form.mileage_due} onChange={handleChange} required />
          </label>
          <label>
            Time (in hours):
            <input type="number" name="time_spent" value={form.time_spent} onChange={handleChange} required />
          </label>
          <label>
            Completed:
            <input
              type="checkbox"
              name="completed"
              checked={form.completed}
              onChange={(e) => setForm({ ...form, completed: e.target.checked })}
            />
          </label>
          </div>
          </div>
          <button type="submit">Add Maintenance Entry</button>
        </form>
      </div>

      <div className="existing-maintenance">
        <h3>Existing Maintenance Records</h3>
        {maintenanceRecords.length === 0 ? (
          <p>No maintenance records found for this vehicle.</p>
        ) : (
          <ul>
            {maintenanceRecords.map(record => (
              <div
                key={record.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: record.completed ? 0.5 : 1,
                  textDecoration: record.completed ? 'line-through' : 'none',
                }}
              >
                <ul className="records">
                  <li className="records" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <strong>{record.maintenance_title}</strong> - {record.maintenance_description} Parts:{record.parts_needed} Cost:{record.cost} Time:{record.time_spent}  (Due: {record.mileage_due} miles)
                    {record.completed && <span style={{ color: 'green', marginLeft: 8 }}>(Completed)</span>}
                  </li>
                  <button onClick={() => navigate('/EditMaintenance', { state: { record } })} disabled={record.completed}>Edit</button>
                  <button onClick={() => handleDelete(record.id)} disabled={record.completed}>Delete</button>
                  {!record.completed && (
                    <button onClick={() => handleMarkComplete(record.id)}>Mark Complete</button>
                  )}
                  {record.completed && (
                    <button onClick={() => handleMarkIncomplete(record.id)}>Mark Incomplete</button>
                  )}
                </ul>
              </div>
              
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NewMaintenanceEntry;