import express from "express";
import { authenticateToken } from "../../middleware/auth.js";
import {
  getGasMiles,
  createGasMiles,
  updateGasMiles,
  deleteGasMiles,
} from "../../controllers/gasMilesController.js";

const router = express.Router();

router.get('/', authenticateToken, getGasMiles);

router.post('/', createGasMiles);

router.put('/:id', updateGasMiles);

router.delete('/:id', deleteGasMiles);

export { router as gasMilesRouter };
