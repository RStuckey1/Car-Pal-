import { userRouter } from "./user-routes.js";
import { commentsRouter } from "./comments-routes.js";
import { Router } from "express";

const router = Router();

router.use("/users", userRouter);
router.use("/comments", commentsRouter);

export default router;
