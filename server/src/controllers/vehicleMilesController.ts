import { Request, Response } from "express";
import { Vehicle } from '../models/vehicle.js';
import { Miles } from '../models/miles.js'; // Import the Miles model

declare global {
  namespace Express {
    interface Request {
      User?: { id: number; username: string }; // Ensure the type includes 'id'
      Vehicle?: { id: number }; // Add Vehicle property to the Request type
    }
  }
}

export const getVehicleMiles = async (_req: Request, res: Response) => {
  try {
    const VehicleId = _req.Vehicle?.id;

    if (!VehicleId) {
      res.status(400).json({ message: "unauthorized" });
      return; // Explicitly return
    }

    const milesList = await Miles.findAll({
      where: { VehicleId: VehicleId },
      include: [
        {
          model: Vehicle,
          attributes: ["vehicleId"],
        },
      ],
    });

    res.json(milesList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehicleMilesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const miles = await Miles.findByPk(id, {
      include: [
        {
          model: Vehicle,
          attributes: ["vehicleId"],
        },
      ],
    });
    if (miles) {
      res.json(miles);
    } else {
      res.status(404).json({ message: "Miles not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createVehicleMiles = async (req: Request, res: Response) => {
  const { date, miles, VehicleId } = req.body;
  try {
    const newMiles = await Miles.create({
      date,
      miles,
      VehicleId,
    });
    res.status(201).json(newMiles);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const updateVehicleMiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, miles } = req.body;
  try {
    const updatedMiles = await Miles.update(
      { date, miles },
      { where: { id } });
    if (updatedMiles[0] > 0) {
      res.json({ message: "miles updated successfully" });
    } else {
      res.status(404).json({ message: "Miles not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVehicleMiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const miles = await Miles.destroy({ where: { id } });
    if (miles) {
      res.json({ message: "Miles deleted successfully" });
    } else {
      res.status(404).json({ message: "Miles not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
