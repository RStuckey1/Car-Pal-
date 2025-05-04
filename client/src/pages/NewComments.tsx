import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComments as createCommentsAPI, deleteComment, retrieveComments } from '../api/CommentsAPI';
import { CommentsData } from '../interfaces/CommentsData';
import { UserData } from '../interfaces/UserData';
import { retrieveUser } from '../api/userAPI';
import { useAuth } from '../context/AuthContext';

const NewComments = () => {
  const { User: loggedInUser } = useAuth(); // Get the logged-in user's info from AuthContext
  const navigate = useNavigate();

  const [newComments, setNewComments] = useState<CommentsData>({
    id: 0,
    username: loggedInUser?.username || '', // Automatically assign the logged-in user's name
    description: '',
  });

  const [user, setUser] = useState<UserData[] | undefined>([]);
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

  // Update the newComments state whenever the loggedInUser changes
  useEffect(() => {
    setNewComments((prev) => ({
      ...prev,
      username: loggedInUser?.username || '', // Update the username field
    }));
  }, [loggedInUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComments) {
      try {
        const data = await createCommentsAPI(newComments);
        console.log('Comment created:', data);

        // Reset the newComments state after submission
        setNewComments({
          id: 0,
          username: loggedInUser?.username || '', // Reset to the logged-in user's username
          description: '',
        });

        fetchComments(); // Refresh comments after successful creation
        navigate('/DisplayComments'); // Redirect to the display comments page after successful creation
      } catch (err) {
        console.error('Failed to create comment:', err);
      }
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComments((prev) => ({ ...prev, [name]: value }));
  };

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
          <button type="submit">Submit Comment</button>
        </form>
       
      </div>
    </>
  );
};

export default NewComments;
