import { MaintenanceData } from '../interfaces/MaintenanceData.tsx';
import { ApiMessage } from '../interfaces/ApiMessage.tsx';
import Auth from '../utils/auth.ts';



const retrieveMaintenanceByVehicle = async (vehicleId: number) => {
  try {
    const response = await fetch(`/api/maintenance/vehicle/${vehicleId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    if (!response.ok) throw new Error('Bad request');
    return await response.json();
  } catch (err) {
    console.error('Error fetching records by vehicle:', err);
    return [];
  }
};


const createVehicleMaintenance = async (body: MaintenanceData) => {
  try {
    // Removed unused token variable
    const response = await fetch(
      '/api/maintenance/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    }

    )
    const data = response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from maintanance Creation: ', err);
    return Promise.reject('Could not create gas');
  }
}

const updateVehicleMaintenance = async (maintenanceId: number, body: MaintenanceData): Promise<MaintenanceData> => {
  try {
    const response = await fetch(
      `/api/maintenance/${maintenanceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    }
    )
    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteVehicleMaintenance = async (maintenanceId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/maintenance/${maintenanceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    }
    )
    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting maintenance', err);
    return Promise.reject('Could not delete maintenance');
  }
};



export { createVehicleMaintenance, retrieveMaintenanceByVehicle, updateVehicleMaintenance, deleteVehicleMaintenance };
