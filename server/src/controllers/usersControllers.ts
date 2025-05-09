import type { Request, Response } from "express";
import { User, Vehicle } from "../models/index.js";


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
