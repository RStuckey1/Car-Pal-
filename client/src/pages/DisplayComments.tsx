import React, { useState, useEffect } from 'react';
import { retrieveComments, deleteComments } from '../api/CommentsAPI';
import { retrieveUser } from '../api/userAPI'; // Assuming this function exists
import { UserData } from '../interfaces/UserData';
import { CommentsData } from '../interfaces/CommentsData';
import { useAuth } from '../context/AuthContext'; // Add this import


const DisplayComments: React.FC = () => {
  const { User: loggedInUser } = useAuth(); 
  const [user, setUser] = useState<UserData[]>([]); 
  const [comments, setComments] = useState<CommentsData[]>([]);

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
      <div className="commentContainer">
        <h1>Comments</h1>
        <ul className="commentList">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.description}</p>
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