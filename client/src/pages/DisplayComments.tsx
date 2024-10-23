import React, { useState, useEffect } from 'react';
import { retrieveComments } from '../api/CommentsAPI';

interface Comment {
  id: number;
  username: string;
  description: string;
  createdAt: Date;
};

const DisplayComments: React.FC = () => {
const [comments, setComments] = useState<Comment[]>([]);
useEffect(() => {
  retrieveComments().then((data) => {
    setComments(data);
    console.log(data);

  });
}, []);
  return (
    <div>
      <h1>Comments</h1>
      {comments.map((comments) => (
        <li key={comments.id}>{comments.username} - {comments.description}</li>
      ))}
    </div>
  );
};

export default DisplayComments;