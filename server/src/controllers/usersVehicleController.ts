import { Request, Response } from "express";
import { Vehicle } from '../models/vehicle.js';
import { User } from '../models/user.js';

declare global {
  namespace Express {
    interface Request {
      User?: { id: number; username: string }; // Ensure the type includes 'id'
    }
  }
}

export const getUserVehicles = async (_req: Request, res: Response) => {
  try {
    const UserId = _req.User?.id;

    if (!UserId) {
      res.status(400).json({ message: "unauthorized" });
      return; // Explicitly return
    }

    const vehiclesList = await Vehicle.findAll({
      where: { UserId: UserId },
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    res.json(vehiclesList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createUserVehicle = async (req: Request, res: Response) => {
  const { vin, make, model, year, miles, color, price, UserId } = req.body;
  try {
    const newVehicle = await Vehicle.create({
      vin,
      make,
      model,
      year,
      miles,
      color,
      price,
      UserId,

    });
    res.status(201).json(newVehicle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const updateUserVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { vin, make, model, year, miles, color, price } = req.body;
  try {
    const vehicle = await Vehicle.update(
      { vin, make, model, year, miles, color, price },
      { where: { id } });
    if (vehicle) {
      res.json({ message: "Vehicle updated successfully" });
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUserVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.destroy({ where: { id } });
    if (vehicle) {
      res.json({ message: "Vehicle deleted successfully" });
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
