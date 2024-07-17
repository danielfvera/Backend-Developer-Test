import { Router } from "express";
import {
  updateContacts,
  updateCompanies,
} from "../controllers/integrationController.js";

const router = Router();

router.post("/contacts", updateContacts);
router.post("/companies", updateCompanies);

export default router;
