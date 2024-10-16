import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComments as createCommentsAPI } from '../api/CommentsAPI';
import { CommentsData } from '../interfaces/CommentsData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';

const NewComments = () => {
  const [newComments, setNewComments] = useState<CommentsData | undefined>(
    {
      id: 0,
      name: '',
      description: '',
      assignedUserId: 1,
      status: 'Todo',
      assignedUser: undefined
    }
  );

  const navigate = useNavigate();

  const [users, setUsers] = useState<UserData[] | undefined>([]);

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComments){
      const data = await createCommentsAPI(newComments);
      console.log(data);
      navigate('/');
    }
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComments((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewComments((prev) => (prev ? { ...prev, [name]: value } : undefined));
  }

  const handleUserChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewComments((prev) => (prev ? { ...prev, [name]: value } : undefined));
  }

  return (
    <>
      <div className='container'>
        <form className='form' onSubmit=
        {handleSubmit}>
          <h1>Create Comments</h1>
          <label htmlFor='tName'>Comments Name</label>
          <textarea 
            id='tName'
            name='name'
            value={newComments?.name || ''}
            onChange={handleTextAreaChange}
            />
          <label htmlFor='tStatus'>Comments Status</label>
          <select 
            name='status' 
            id='tStatus'
            value={newComments?.status || ''}
            onChange={handleTextChange}
          >
            <option value='Todo'>Todo</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
          <label htmlFor='tDescription'>Comments Description</label>
          <textarea 
            id='tDescription'
            name='description'
            value={newComments?.description || ''}
            onChange={handleTextAreaChange}
          />
          <label htmlFor='tUserId'>User's ID</label>
          <select
            name='assignedUserId'
            value={newComments?.assignedUserId || ''}
            onChange={handleUserChange}
          >
            {users ? users.map((user) => {
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
          <button type='submit' onSubmit={handleSubmit}>Submit Form</button>
        </form>
      </div>
    </>
  )
};

export default NewComments;
