import express from "express";
import {
  createVehicleMaintenance,
  updateVehicleMaintenance,
  deleteVehicleMaintenance,
  getMaintenanceByVehicle,
} from "../../controllers/maintenanceController.js";

const router = express.Router();

router.post("/", createVehicleMaintenance);

router.put("/:id", updateVehicleMaintenance);

router.delete("/:id", deleteVehicleMaintenance);

router.get('/vehicle/:VehicleId', getMaintenanceByVehicle);

export { router as gasRouter };
