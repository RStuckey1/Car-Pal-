// import express from 'express';
// // import type { Request, Response } from 'express';
// // import { Vehicle } from '../../models/vehicle.js';

import express from "express";
import {
  getUsersByVin,
  getUsersByLocation,
} from "../../controllers/usersControllers.js";

const router = express.Router();

// GET /vehicle-user/vin/:vin - Get all users by vehicle VIN
router.get("/vin/:vin", getUsersByVin);

// GET /vehicle-user/location/:location - Get all users by location
router.get("/location/:location", getUsersByLocation);

export { router as vehicleUserRouter };
