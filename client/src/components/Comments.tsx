import { Link } from 'react-router-dom';

import { ApiMessage } from '../interfaces/ApiMessage';
import { CommentsData } from '../interfaces/CommentsData';
import React from 'react';

interface CommentsCardProps {
  Comments: CommentsData;
  deleteComments: (CommentsId: number) => Promise<ApiMessage>
}

const CommentsCard = ({ Comments, deleteComments }: CommentsCardProps) => {

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const CommentsId = Number(event.currentTarget.value);
    if (!isNaN(CommentsId)) {
      try {
        const data = await deleteComments(CommentsId);
        return data;
      } catch (error) {
        console.error('Failed to delete Comments:', error);
      }
    }
  };

  return (
    <div className='Comments-card'>
      <h3>{Comments.name}</h3>
      <p>{Comments.description}</p>
      <p>{Comments.assignedUser?.username}</p>
      <Link to='/edit' state={{id: Comments.id}} type='button' className='editBtn'>Edit</Link>
      <button type='button' value={String(Comments.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default CommentsCard;
