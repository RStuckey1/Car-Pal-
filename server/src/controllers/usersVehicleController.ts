import { Request, Response } from "express";
import { Vehicle } from '../models/vehicle.js';
import { User } from '../models/user.js';
//import { handleErrors } from "../utils/errorHandler";

export const getUserVehicles = async (_req: Request, res: Response) => {
  const { userId } = _req.params;
  try {
    const vehiclesList = await Vehicle.findAll({
      where: { ownerId: userId },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ]
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
  const { vin, make, model, year, mileage, color, price, ownerId } = req.body;
  try {
    const newVehicle = await Vehicle.create({
      vin,
      make,
      model,
      year,
      mileage,
      color,
      price,
      ownerId,

    });
    res.status(201).json(newVehicle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const updateUserVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { vin, make, model, year, mileage, color, price } = req.body;
  try {
    const vehicle = await Vehicle.update(
      { vin, make, model, year, mileage, color, price },
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
