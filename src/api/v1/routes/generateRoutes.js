import express from "express";
import { generateEmail} from "../controllers/generateController.js";

const router = express.Router();

router.get('/generate', generateEmail);

export default router;