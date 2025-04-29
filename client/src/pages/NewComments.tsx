import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComments as createCommentsAPI } from '../api/CommentsAPI';
import { CommentsData } from '../interfaces/CommentsData';
import { UserData } from '../interfaces/UserData';
import { retrieveUser } from '../api/userAPI';
import { useAuth } from '../context/AuthContext';

const NewComments = () => {
  const { user: loggedInUser } = useAuth(); // Get the logged-in user's info from AuthContext
  const navigate = useNavigate();

  const [newComments, setNewComments] = useState<CommentsData>({
    id: 0,
    username: loggedInUser?.name || '', // Automatically assign the logged-in user's name
    description: '',
    assignedUserId: loggedInUser?.id || 0, // Automatically assign the logged-in user's ID
    assignedUser: undefined,
  });

  const [user, setUser] = useState<UserData[] | undefined>([]);

  const getAllUser = async () => {
    try {
      const data = await retrieveUser();
      setUser(data);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComments) {
      const data = await createCommentsAPI(newComments);
      console.log(data);
      navigate('/NewComments');
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComments((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewComments((prev) => ({ ...prev, assignedUserId: parseInt(value) }));
  };

  return (
    <>
      <div className="container-newcomments">
        <form onSubmit={handleSubmit}>
          <label htmlFor="tDescription">Comment</label>
          <textarea
            id="tDescription"
            name="description"
            value={newComments?.description || ''}
            onChange={handleTextAreaChange}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={newComments?.username || ''}
            disabled // Disable the input field since the username is auto-assigned
          />
          <label htmlFor="tUserId">User's ID</label>
          <select
            name="assignedUserId"
            value={newComments?.assignedUserId || ''}
            onChange={handleUserChange}
          >
            {user
              ? user.map((user) => (
                  <option key={user.id} value={String(user.id)}>
                    {user.username}
                  </option>
                ))
              : null}
          </select>
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </>
  );
};

export default NewComments;
