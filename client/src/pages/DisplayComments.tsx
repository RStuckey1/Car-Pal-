import { useState } from 'react';
import { retrieveComments } from '../api/CommentsAPI';

interface Comment {
  id: number;
  date: string;
  description: string;
}


const DisplayComments = () => {
const [comments, setComments] = useState<Comment[]>([]);
const displayComments = retrieveComments();
console.log(displayComments);
displayComments.then((data) => {
  setComments(data);


});
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h1>{comment.date}</h1>
          <p>{comment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayComments;