import React, { useState, useEffect } from 'react';
import { retrieveComments, deleteComment } from '../api/CommentsAPI';
import { retrieveUser } from '../api/userAPI'; // Assuming this function exists
import { UserData } from '../interfaces/UserData';
import { CommentsData } from '../interfaces/CommentsData';

const DisplayComments: React.FC = () => {
  const [user, setUser] = useState<UserData[]>([]); // Corrected type to avoid undefined
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

  const handleDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      console.log(`Comment with ID ${commentId} deleted successfully.`);
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
              {user?.find((u) => u.username === comment.username) && (
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