
import express from "express";
import {
  getUserByVin,
  getUserByLocation,
} from "../../controllers/usersControllers.js";

const router = express.Router();

router.get("/vin/:vin", getUserByVin);

router.get("/location/:location", getUserByLocation);

export { router as vehicleUserRouter };
