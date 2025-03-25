import { userRouter } from "./user-routes.js";
import { commentsRouter } from "./comments-routes.js";
import { vehicleUserRouter } from "./vehicle-user.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
router.use("/comments", commentsRouter);
router.use("/vehicles", vehicleUserRouter);

export default router;
