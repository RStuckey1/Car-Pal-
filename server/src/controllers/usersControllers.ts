import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Vehicle } from "../models/index.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.User?.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to load user";
    return res.status(500).json({ message });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  const userId = req.User?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { username, email, currentPassword, password } = req.body as {
    username?: unknown;
    email?: unknown;
    currentPassword?: unknown;
    password?: unknown;
  };

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username !== undefined) {
      if (typeof username !== "string" || !username.trim()) {
        return res.status(400).json({ message: "Username cannot be empty" });
      }
      const normalizedUsername = username.trim();
      const existingUsername = await User.findOne({ where: { username: normalizedUsername } });
      if (existingUsername && existingUsername.id !== userId) {
        return res.status(409).json({ message: "That username is already in use" });
      }
      user.username = normalizedUsername;
    }

    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        return res.status(400).json({ message: "Enter a valid email address" });
      }
      const normalizedEmail = email.trim();
      const existingEmail = await User.findOne({ where: { email: normalizedEmail } });
      if (existingEmail && existingEmail.id !== userId) {
        return res.status(409).json({ message: "That email is already in use" });
      }
      user.email = normalizedEmail;
    }

    if (password !== undefined) {
      if (
        typeof password !== "string" ||
        !password ||
        typeof currentPassword !== "string" ||
        !currentPassword
      ) {
        return res.status(400).json({ message: "Current and new passwords are required" });
      }
      if (!(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      user.password = password;
    } else if (currentPassword !== undefined) {
      return res.status(400).json({ message: "A new password is required" });
    }

    await user.save();
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1d" },
    );

    return res.json({
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to update user";
    return res.status(400).json({ message });
  }
};

export const getUser = async (_req: Request, res: Response) => {
  try {
    const user = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByVin = async (req: Request, res: Response) => {
  const { vin } = req.params;
  try {
    const vehicles = await Vehicle.findAll({
      where: { vin },
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    const user = vehicles.flatMap((vehicle) =>
      "user" in vehicle ? [vehicle.user] : [],
    );
    if (user.length > 0) {
      res.json(user);
    } else {
      res.status(404).json({ message: "No user found for this VIN" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
