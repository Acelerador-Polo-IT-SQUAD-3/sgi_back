import { Router } from "express";
const router = Router()
import { getUserItems } from "../controllers/teams.js";
import {sendEmail} from "../controllers/sendEmail.js";

router.get(`/`, sendEmail);
router.get(`/:id`, getUserItems);

export default router