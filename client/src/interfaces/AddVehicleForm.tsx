import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AddVehicleProps {
    onAddVehicle: (vin: string) => void;
}

const AddVehicleForm: React.FC<AddVehicleProps> = ({ onAddVehicle }) => {
    const [vin, setVin] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (vin.trim() === '') {
            setError('Vin cannot be empty.');
            return;
        }

        onAddVehicle(vin);
        setVin('');  // Clear the input field after submission
        setError(null);   // Reset the error message
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
                <label htmlFor="vin" className="form-label">Vin</label>
                <input
                    type="text"
                    className="form-control"
                    id="vin"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    placeholder="Enter Vin"
                />
                {error && <div className="text-danger mt-1">{error}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Add Vehicle</button>
        </form>
    );
};

export default AddVehicleForm;