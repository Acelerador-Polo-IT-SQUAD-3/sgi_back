import { Router } from "express";
const router = Router()
import {getItems } from'../controllers/menus.js';




router.get(`/:role_id`, getItems);



export default router