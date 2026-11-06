import Auth from '../utils/auth';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
}

export interface UserProfileUpdate {
  username: string;
  email: string;
  currentPassword?: string;
  password?: string;
}

const requestProfile = async (path: string, method: 'GET' | 'PUT', body?: UserProfileUpdate) => {
  const response = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to update account preferences.');
  }

  return data;
};

const getCurrentUser = async (): Promise<UserProfile> => {
  const data = await requestProfile('/api/user/me', 'GET');
  return data.user;
};

const updateCurrentUser = async (profile: UserProfileUpdate): Promise<{ user: UserProfile; token: string }> => {
  return requestProfile('/api/user/me', 'PUT', profile);
};

const retrieveUser = async () => {
  try {
    const response = await fetch('/api/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { getCurrentUser, retrieveUser, updateCurrentUser };
