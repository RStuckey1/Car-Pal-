import express from "express";
import { authenticateToken } from "../../middleware/auth.js";
import {
  getVehicleMiles,
  getVehicleMilesById,
  createVehicleMiles,
  updateVehicleMiles,
  deleteVehicleMiles,
} from "../../controllers/vehicleMilesController.js";

const router = express.Router();

router.get('/', authenticateToken, getVehicleMiles);

router.get('/:id', getVehicleMilesById);

router.post('/', createVehicleMiles);

router.put('/:id', updateVehicleMiles);

router.delete('/:id', deleteVehicleMiles);

export { router as vehicleMilesRouter };
