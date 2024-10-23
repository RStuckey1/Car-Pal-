import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComments as createCommentsAPI } from '../api/CommentsAPI';
import { CommentsData } from '../interfaces/CommentsData';
import { UserData } from '../interfaces/UserData';
import { retrieveUser } from '../api/userAPI';


const NewComments = () => {
  const [newComments, setNewComments] = useState<CommentsData | undefined>(
    {
      id: 0,
      username: '',
      description: '',
      assignedUserId: 1,
      assignedUser: undefined
    }
  );

  const navigate = useNavigate();

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
    if (newComments){
      const data = await createCommentsAPI(newComments);
      console.log(data);
      navigate('/NewComments');
    }
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComments((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleUserChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewComments((prev) => (prev ? { ...prev, [name]: value } : undefined));
  }

  return (
    <>
      <div className='container-newcomments'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='tDescription'>Comments </label>
          <textarea 
            id='tDescription'
            name='description'
            value={newComments?.description || ''}
            onChange={handleTextAreaChange}
          />
           <label htmlFor='username'>UserName</label>
          <textarea 
            id='username'
            name='username'
            value={newComments?.username || ''}
            onChange={handleTextAreaChange}
          />
          <label htmlFor='tUserId'>User's ID</label>
          <select
            name='assignedUserId'
            value={newComments?.assignedUserId || ''}
            onChange={handleUserChange}
          >
            {user ? user.map((user) => {
              return (
                <option key={user.id} value={String(user.id)}>
                  {user.username}
                </option>
              )
            }) : (
            <textarea 
              id='tUserId'
              name='assignedUserId'
              value={newComments?.assignedUserId || 0}
              onChange={handleTextAreaChange}
            />
            )
          }
          </select>
          <button type='submit'>Submit Comment</button>
        </form>
       
      </div>
    </>
  )
};

export default NewComments;
