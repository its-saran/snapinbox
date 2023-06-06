import express from "express";
// import { generateEmail} from "../controllers/generateController.js";
import { generateEmail} from "../controllers/testController.js";

const router = express.Router();

router.get('/generate', generateEmail);

export default router;