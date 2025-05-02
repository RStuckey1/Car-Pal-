import express from "express";
import { authenticateToken } from "../../middleware/auth.js";
import {
  getUserVehicles,
  getUserVehicleById,
  createUserVehicle,
  updateUserVehicle,
  deleteUserVehicle,
} from "../../controllers/usersVehicleController.js";

const router = express.Router();

router.get('/', authenticateToken, getUserVehicles);

router.get('/:id', getUserVehicleById);

router.post('/', createUserVehicle);

router.put('/:id', updateUserVehicle);

router.delete('/:id', deleteUserVehicle);

export { router as userVehicleRouter };
