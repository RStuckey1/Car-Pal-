import express from "express";
import {
  getGasMiles,
  createGasMiles,
  updateGasMiles,
  deleteGasMiles,
  getLastGasEntry,
  getGasMilesByVehicle,
} from "../../controllers/gasMilesController.js";

const router = express.Router();

router.get("/", getGasMiles);

router.post("/", createGasMiles);

router.put("/:id", updateGasMiles);

router.delete("/:id", deleteGasMiles);

router.get('/last/:VehicleId', getLastGasEntry);

router.get('/vehicle/:VehicleId', getGasMilesByVehicle);

export { router as gasRouter };
