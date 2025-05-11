import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComments as createCommentsAPI } from '../api/CommentsAPI';
import { CommentsData } from '../interfaces/CommentsData';
import { useAuth } from '../context/AuthContext';

const NewComments = () => {
  const { User: loggedInUser, loading } = useAuth(); // Get the logged-in user's info from AuthContext
  const navigate = useNavigate();

  const [newComments, setNewComments] = useState<CommentsData | null>(null);
    
  useEffect(() => {
    if (!loading && loggedInUser) {
      setNewComments({
        id: 1,
        username: loggedInUser.username || '',
        description: '',
        UserId: loggedInUser.id || 0, // Assign the logged-in user's ID

      });
    }
  }, [loggedInUser, loading]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComments) return;{
      try {
        const data = await createCommentsAPI(newComments);
        console.log('Comment created', data);

        // Reset the newComments state after submission
        setNewComments({
          id: 0,
          username: loggedInUser?.username || '', // Reset to the logged-in user's username
          description: '',
          UserId: loggedInUser?.id || 0, // Reset to the logged-in user's ID
        });

        navigate('/DisplayComments'); // Redirect to the display comments page after successful creation
      } catch (err) {
        console.error('Failed to create comment:', err);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComments((prev) => prev && ({
      ...prev,
      [name]: value, // Update the specific field in the state
    }));
  };

  if (loading || !newComments) {
    // Show a loading indicator or nothing while loading
    return <p>Loading...</p>;
  }

  return (
    <div className="container-newComments">
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Comment</label>
        <input
          type="text"
          id="description"
          name="description"
          value={newComments.description}
          onChange={handleChange}
        />

        <button type="submit">Submit Comments</button>
      </form>
    </div>
  );
};

export default NewComments;
