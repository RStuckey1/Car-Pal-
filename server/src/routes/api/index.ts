import { userRouter } from "./user-routes.js";
import { userVehicleRouter } from "./vehicle-user.js";
import { gasRouter } from "./gas-routes.js";
import { maintenanceRouter } from "./maintenance-routes.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
router.use("/vehicles", userVehicleRouter);
router.use("/gas", gasRouter);
router.use("/maintenance", maintenanceRouter);

export default router;
