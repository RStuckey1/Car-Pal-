import { Request, Response } from "express";
import { Vehicle } from '../models/vehicle.js';
import { Gas } from '../models/gas.js'; // Import the Miles model

declare global {
  namespace Express {
    interface Request {
      User?: { id: number; username: string }; // Ensure the type includes 'id'
      Vehicle?: { id: number }; // Add Vehicle property to the Request type
    }
  }
}


export const getGasMiles = async (_req: Request, res: Response) => {
  try {   
    const VehicleId = _req.Vehicle?.id;

    if (!VehicleId) {
      res.status(400).json({ message: "unauthorized" });
      return;
    }

    const gasList = await Gas.findAll({
      where: { VehicleId: VehicleId },
      include: [
        {
          model: Vehicle,
          attributes: ['id'],
        },
      ],
    });
   
      res.json(gasList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createGasMiles = async (req: Request, res: Response) => {
  try {
    const VehicleId = req.Vehicle?.id ?? req.body.VehicleId;
    if (!VehicleId) {
      return res.status(400).json({ message: "unauthorized" });
    }

    const lastEntry = await Gas.findOne({
      where: { VehicleId },
      order: [['date', 'DESC']],
    });

    let starting_miles: number;

    if (!lastEntry) {
      const vehicle = await Vehicle.findByPk(VehicleId);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      starting_miles = vehicle.miles;
    } else {
      starting_miles = lastEntry.current_miles;
    }

    // Get other fields from req.body
    const { date, current_miles, gallons_gas, gas_price } = req.body;

    // Optionally, recalculate mpg here to ensure correctness:
    const calculatedMpg = (current_miles - starting_miles) / gallons_gas;

    const newGasMiles = await Gas.create({
      date,
      starting_miles,
      current_miles,
      gallons_gas,
      mpg: calculatedMpg, // Use calculated value to ensure correctness
      gas_price,
      VehicleId,
    });

    return res.status(201).json(newGasMiles);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};


export const updateGasMiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date } = req.body;
  try {
    const updatedGasMiles = await Gas.update(
      { date,  },
      { where: { id } });
    if (updatedGasMiles[0] > 0) {
      res.json({ message: "miles updated successfully" });
    } else {
      res.status(404).json({ message: "Miles not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGasMiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const miles = await Gas.destroy({ where: { id } });
    if (miles) {
      res.json({ message: "Miles deleted successfully" });
    } else {
      res.status(404).json({ message: "Miles not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLastGasEntry = async (VehicleId: number) => {
  try {
    const lastEntry = await Gas.findOne({
      where: { VehicleId },
      order: [['date', 'DESC']],
    });
    return lastEntry;
  } catch (error) {
    console.error("Error fetching last gas entry:", error);
    throw error;
  }
};

export const getGasMilesByVehicle = async (req: Request, res: Response) => {
  try {
    const { VehicleId } = req.params;
    const entries = await Gas.findAll({ where: { VehicleId } });
    res.json(entries);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};