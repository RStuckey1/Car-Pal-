
import express from "express";
import {
  getUserVehicles,
  createUserVehicle,
} from "../../controllers/usersVehicleController.js";

const router = express.Router();

router.get("/userId/vehicles", getUserVehicles);
router.post("/userId/vehicles", createUserVehicle);

export { router as userVehicleRouter };
