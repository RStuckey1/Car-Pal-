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


export const getGasMiles = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const gasMiles = await Gas.findByPk(vehicleId, {
      include: [
        {
          model: Vehicle,
          attributes: ["vehicleId"],
        },
      ],
    });
    if (gasMiles) {
      res.json(gasMiles);
    } else {
      res.status(404).json({ message: "Gas miles not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createGasMiles = async (req: Request, res: Response) => {
  const { date, starting_miles, current_miles, gallons_gas, mpg, gas_price, vehicleId } = req.body;
  try {
    const newGasMiles = await Gas.create({
      date,
      starting_miles,
      current_miles,
      gallons_gas,
      mpg,
      gas_price,
      vehicleId,
    });
    res.status(201).json(newGasMiles);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
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

export const getLastGasEntry = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const lastEntry = await Gas.findOne({
      where: { vehicleId },
      order: [['date', 'DESC']],
    });
    if (!lastEntry) {
      return res.status(404).json({ message: 'No gas entries found for this vehicle.' });
    }
    return res.json(lastEntry); // Ensure return here
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error }); // Ensure return here
  }
};
