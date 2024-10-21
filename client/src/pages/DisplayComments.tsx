import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateComments, retrieveComments } from '../api/CommentsAPI';
import { CommentsData } from '../interfaces/CommentsData';

const DisplayComments = () => {
  const [comments, setComments] = useState<CommentsData | undefined>();

  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const data = await retrieveComments();
      setComments(data);
    } catch (err) {
      console.error('Failed to retrieveComments:', err);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comments && comments.id !== null){
      updateComments(comments.id, comments);
      navigate('/');
    }
    else{
      console.error('Comments data is undefined.');
    }
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComments((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <>
      <div className='container'>
        {
        comments ? (
            <form className='form' onSubmit={handleSubmit}>
              <h1>Display Comments</h1>
              <label htmlFor='tName'>Comments Name</label>
              <textarea
                id='tName'
                name='name'
                value={ comments.name || ''}
                onChange={handleTextAreaChange}
                />
            <label htmlFor='tDescription'>Comments Description</label>
              <textarea
                id='tDescription'
                name='description'
                value={comments.description || ''}
                onChange={handleTextAreaChange}
              />
              <button type='submit'>Submit Form</button>
            </form>
          ) : (
            <div>Issues fetching nComments</div>
          )
        }
      </div>  
    </>
  );
};

export default DisplayComments;
