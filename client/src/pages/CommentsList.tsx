import React from 'react';
import DisplayComments from './DisplayComments';

const CommentsList: React.FC = () => {
  return (
    <div>
      <label>Comments</label>
      <DisplayComments />
    </div>
  );
};

export default CommentsList; 