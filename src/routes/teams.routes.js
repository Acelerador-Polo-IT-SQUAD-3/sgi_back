import { Router } from "express";
const router = Router()
import { getUserItems, sendEmailForUsers } from "../controllers/teams.js";

router.get(`/:id`, getUserItems);
router.post(`/`, sendEmailForUsers);

export default router