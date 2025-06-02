import { Request, Response } from "express";
import { Maintenance } from '../models/maintenance.js';

declare global {
  namespace Express {
    interface Request {
      User?: { id: number; username: string }; // Ensure the type includes 'id'
      Vehicle?: { id: number }; // Add Vehicle property to the Request type
    }
  }
}


export const createVehicleMaintenance = async (req: Request, res: Response) => {
  const { date_due, maintenance_title, maintenance_description, parts_needed, cost, time_spent, VehicleId } = req.body;
  try {
    const newMaintenance = await Maintenance.create({
        date_due,
        maintenance_title,
        maintenance_description,
        parts_needed,
        cost,
        time_spent,
        VehicleId, // Ensure this is the correct field for the Vehicle model

    });
    res.status(201).json(newMaintenance);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const updateVehicleMaintenance = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedVehicleMaintenance = await Maintenance.update(
      req.body,
      { where: { id } }
    );
    if (updatedVehicleMaintenance[0] > 0) {
      res.json({ message: "Maintenance updated successfully" });
    } else {
      res.status(404).json({ message: "Maintenance not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVehicleMaintenance = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const maintenance = await Maintenance.destroy({ where: { id } });
    if (maintenance) {
      res.json({ message: "Miles deleted successfully" });
    } else {
      res.status(404).json({ message: "Miles not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMaintenanceByVehicle = async (req: Request, res: Response) => {
  try {
    const { VehicleId } = req.params;
    const entries = await Maintenance.findAll({ where: { VehicleId } });
    res.json(entries);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};
