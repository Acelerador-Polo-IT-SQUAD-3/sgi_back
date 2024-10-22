import { Router } from "express";
const router = Router()
import { getUserItems, sendEmailForUsers, getItems } from "../controllers/teams.js";

router.get(`/:id`, getUserItems);
router.get(`/`, getItems);
router.post(`/`, sendEmailForUsers);

export default router