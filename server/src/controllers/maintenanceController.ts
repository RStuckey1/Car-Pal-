import { Request, Response } from "express";
import { Maintenance } from '../models/maintenance.js';

const serializePartsNeeded = (value: unknown): string => {
  if (!Array.isArray(value) || !value.every((part) => typeof part === "string")) {
    throw new Error("Parts needed must be a list of parts");
  }

  const parts = value.map((part: string) => part.trim()).filter(Boolean);
  if (parts.length === 0) {
    throw new Error("Add at least one part");
  }

  return JSON.stringify(parts);
};

const deserializePartsNeeded = (value: unknown): string[] => {
  if (typeof value !== "string" || value.length === 0) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.every((part) => typeof part === "string")) {
      return parsed;
    }
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
  }

  return [value];
};

declare global {
  namespace Express {
    interface Request {
      User?: { id: number; username: string }; // Ensure the type includes 'id'
      Vehicle?: { id: number }; // Add Vehicle property to the Request type
    }
  }
}


export const createVehicleMaintenance = async (req: Request, res: Response) => {
  const { mileage_due, maintenance_title, maintenance_description, cost, time_spent, completed, VehicleId } = req.body;
  try {
    const newMaintenance = await Maintenance.create({
        mileage_due,
        maintenance_title,
        maintenance_description,
        parts_needed: serializePartsNeeded(req.body.parts_needed),
        cost,
        time_spent,
        completed,
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
    const updates = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(updates, "parts_needed")) {
      updates.parts_needed = serializePartsNeeded(updates.parts_needed);
    }

    const updatedVehicleMaintenance = await Maintenance.update(
      updates,
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
    res.json(entries.map((entry) => ({
      ...entry.toJSON(),
      parts_needed: deserializePartsNeeded(entry.parts_needed),
    })));
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};
