import { CommentsData } from '../interfaces/CommentsData.tsx';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

const retrieveComments = async () => {
  try {
    const response = await fetch(
      '/api/Comments/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
};
const retrieveCommentsById = async (id: number | null): Promise<CommentsData> => {
  try {
    const response = await fetch(
      `/api/comments/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    const data = await response.json();

    if(!response.ok) {
      throw new Error('Could not invalid API response, check network tab!');
    }
    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return Promise.reject('Could not fetch singular comment');
  }
}

const createComments = async (body: CommentsData) => {
  try {
    const response = await fetch(
      '/api/tickets/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
          },
        body: JSON.stringify(body)
      }

    )
    const data = response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from comment Creation: ', err);
    return Promise.reject('Could not create comment');
  }
}

const updateComments = async (commentsId: number, body: CommentsData): Promise<CommentsData> => {
  try {
    const response = await fetch(
      `/api/comments/${commentsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(body)
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteComments = async (commentsId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/comments/${commentsId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting comment', err);
    return Promise.reject('Could not delete comment');
  }
};


export { createComments, deleteComments, retrieveComments, retrieveCommentsById, updateComments};
