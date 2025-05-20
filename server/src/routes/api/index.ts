import { userRouter } from "./user-routes.js";
import { commentsRouter } from "./comments-routes.js";
import { userVehicleRouter } from "./vehicle-user.js";
import { gasRouter } from "./gas-routes.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
router.use("/comments", commentsRouter);
router.use("/vehicles", userVehicleRouter);
router.use("/gas", gasRouter);

export default router;
