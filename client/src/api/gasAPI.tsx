import { GasData } from '../interfaces/GasData.tsx';
import { ApiMessage } from '../interfaces/ApiMessage.tsx';
import Auth from '../utils/auth.ts';


const retrieveGas = async () => {
  try {
    const response = await fetch('/api/gas/', {
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
    console.error('Error fetching gas mileage:', err);
    return [];
  }
};

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

const retrieveGasById = async (id: number | null): Promise<GasData> => {
  try {
    const response = await fetch(
      `/api/gas/${id}`,
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
    return Promise.reject('Could not fetch gas mileage');
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


export { createGas, deleteGas, retrieveGas, retrieveGasByVehicle, retrieveGasById, updateGas };
