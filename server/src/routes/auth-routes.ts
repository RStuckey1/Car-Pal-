import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("Incoming Data: ", req.body);

  const user = await User.findOne({
    where: { username },
  });
  console.log("User: ", user);
  if (!user) {
    console.log("User not found");
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  console.log("Valid: ", passwordIsValid);
  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  console.log("Server Token: ", token);
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
