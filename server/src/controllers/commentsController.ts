import { Request, Response } from 'express';
import { Comments } from '../models/comments.js';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

export const getAllComments = async (_req: Request, res: Response) => {
  try {
    const commentsList = await Comments.findAll({
      include: [
        {
          model: User, 
          attributes: ['username'],
        },
      ],
    });
    res.json(commentsList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comments = await Comments.findByPk(id, {
      include: [
        {
          model: User, 
          attributes: ['username'], 
        },
      ],
    });
    if (comments) {
      res.json(comments);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createComments = async (req: Request, res: Response) => {
  const { username, description, UserId } = req.body;
  try {
    const newComments = await Comments.create({ username, description, UserId });
    res.status(201).json(newComments);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, description } = req.body;
  try {
    const comments = await Comments.update({ username, description }, { where: { id } });
    if (comments) {
      res.json(comments);
    } else {
      res.status(404).json({ message: 'comments not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { username: string };

    // Find the comment
    const comment = await Comments.findOne({ where: { id } });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the logged-in user owns the comment
    if (comment.username !== decoded.username) {
      return res.status(403).json({ message: 'Forbidden: You are not authorized to delete this comment' });
    }

    // Delete the comment
    await Comments.destroy({ where: { id } });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  return; // Ensure all code paths return a value
};
