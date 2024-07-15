import { Router } from "express";
import { migrateData } from "../controllers/migrationController.js";

const router = Router();

router.get("/migrate", migrateData);

export default router;
