import { Request, Response } from 'express';
import { Comments } from '../models/comments.js';
import { User } from '../models/user.js';


export const getAllComments = async (_req: Request, res: Response) => {
  try {
    const commentsList = await Comments.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser', 
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
          as: 'assignedUser', 
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
  const { name, description, assignedUserId } = req.body;
  try {
    const newComments = await Comments.create({ name, description, assignedUserId });
    res.status(201).json(newComments);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const updateComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, assignedUserId } = req.body;
  try {
    const comments = await Comments.findByPk(id);
    if (comments) {
      comments.name = name;
      comments.description = description;
      comments.assignedUserId = assignedUserId;
      await comments.save();
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
  try {
    const comments = await Comments.findByPk(id);
    if (comments) {
      await comments.destroy();
      res.json({ message: 'comments deleted' });
    } else {
      res.status(404).json({ message: 'comments not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
