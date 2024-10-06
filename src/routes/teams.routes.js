import { Router } from "express";
const router = Router()
import {getItems} from'../controllers/teams.js';






router.get(`/`, getItems)


export default router