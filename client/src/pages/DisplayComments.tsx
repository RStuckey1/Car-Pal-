import React, { useState, useEffect } from 'react';
import { retrieveComments, deleteComments } from '../api/CommentsAPI';
import { retrieveUser } from '../api/userAPI';
import { UserData } from '../interfaces/UserData';
import { CommentsData } from '../interfaces/CommentsData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Add this import
import Carousel from '../components/carousel.tsx'; // Adjust the import path as necessary


const DisplayComments: React.FC = () => {
  const { User: loggedInUser } = useAuth(); 
  const [user, setUser] = useState<UserData[]>([]); 
  const [comments, setComments] = useState<CommentsData[]>([]);
  const navigate = useNavigate(); // Add this line

  const getAllUser = async () => {
    try {
      const data = await retrieveUser();
      setUser(data);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await retrieveComments(); // Fetch all comments
      setComments(data);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  useEffect(() => {
    getAllUser();
    fetchComments();
  }, []);

  useEffect(() => {
    console.log('User data:', user);
    console.log('Comments data:', comments);
  }, [user, comments]);

  const handleDelete = async (commentId: number) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!loggedInUser || comment?.UserId !== loggedInUser.id) {
      alert("you can only delete your own comments");
      return;
    }
    try {
      await deleteComments(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  return (
    <div>
      <Carousel />
      <div className="commentContainer">
        <h1>Comments</h1>
        <button onClick={() => navigate('/NewComments')} style={{ marginBottom: '1em' }}>
          Add New Comment
        </button>
        <ul className="commentList">
          {comments.map((comment) => (
            <li key={comment.id}>
              User:{comment.username} <br />
              Comment:{comment.description} <br />
              {loggedInUser && comment.UserId === loggedInUser.id && (
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayComments;