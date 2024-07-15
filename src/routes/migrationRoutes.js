import express from "express";
import { migrateData, getApiInfo } from "../controllers/migrationController.js";

const router = express.Router();

router.get("/migrate", migrateData);
router.get("/", getApiInfo);

export default router;
