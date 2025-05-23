import { GasData } from '../interfaces/GasData.tsx';
import { ApiMessage } from '../interfaces/ApiMessage.tsx';
import Auth from '../utils/auth.ts';



const retrieveGasByVehicle = async (vehicleId: number) => {
  try {
    const response = await fetch(`/api/gas?vehicleId=${vehicleId}`, {
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

const getLastGasEntry = async (vehicleId: number) => {
  try {
    const response = await fetch(
      `/api/gas/${vehicleId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    if (!response.ok) {
      // If 404, just return null (no entries yet)
      if (response.status === 404) return null;
      throw new Error('Invalid API response, check network tab!');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return null;
  }
}


const createGas = async (body: GasData) => {
  try {
    // Removed unused token variable
    const response = await fetch(
      '/api/gas/', {
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
    console.log('Error from mileage Creation: ', err);
    return Promise.reject('Could not create gas');
  }
}

const updateGas = async (gasId: number, body: GasData): Promise<GasData> => {
  try {
    const response = await fetch(
      `/api/gas/${gasId}`, {
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

const deleteGas = async (gasId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/gas/${gasId}`, {
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
    console.error('Error in deleting gas', err);
    return Promise.reject('Could not delete gas');
  }
};



export { deleteGas, retrieveGasByVehicle, getLastGasEntry, updateGas, createGas };
