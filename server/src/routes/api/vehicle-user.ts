import express from "express";
import {
  getUserVehicles,
  getUserVehicleById,
  createUserVehicle,
  updateUserVehicle,
  deleteUserVehicle,
} from "../../controllers/usersVehicleController.js";

const router = express.Router();

router.get('/', getUserVehicles);

router.get('/:id', getUserVehicleById);

router.post('/', createUserVehicle);

router.put('/:id', updateUserVehicle);

router.delete('/:id', deleteUserVehicle);

export { router as userVehicleRouter };
