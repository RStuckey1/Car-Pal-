import { VehicleData } from '../interfaces/VehicleData.tsx';
import { ApiMessage } from '../interfaces/ApiMessage.tsx';
import Auth from '../utils/auth.ts';


const retrieveVehicles = async () => {
  try {
    const response = await fetch('/api/vehicles/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`, // Include the token
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    return [];
  }
};

const retrieveVehiclesByUser = async (userId: number) => {
  try {
    const response = await fetch(`/api/vehicles?UserId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error fetching user vehicles:', err);
    return [];
  }
};

const retrieveVehicleById = async (id: number | null): Promise<VehicleData> => {
  try {
    const response = await fetch(
      `/api/vehicles/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Could not invalid API response, check network tab!');
    }
    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return Promise.reject('Could not fetch vehicle');
  }
}

const createVehicle = async (body: VehicleData) => {
  try {
    // Removed unused token variable
    const response = await fetch(
      '/api/vehicles/', {
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
    console.log('Error from vehicle Creation: ', err);
    return Promise.reject('Could not create vehicle');
  }
}

const updateVehicle = async (vehicleId: number, body: VehicleData): Promise<VehicleData> => {
  try {
    const response = await fetch(
      `/api/vehicles/${vehicleId}`, {
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

const deleteVehicle = async (vehicleId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/vehicles/${vehicleId}`, {
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
    console.error('Error in deleting vehicle', err);
    return Promise.reject('Could not delete vehicle');
  }
};


export { createVehicle, deleteVehicle, retrieveVehicles, retrieveVehiclesByUser, retrieveVehicleById, updateVehicle };
