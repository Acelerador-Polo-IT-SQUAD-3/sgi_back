import { Router } from "express";
const router = Router()
import {getItems } from'../controllers/menus.js';




router.get(`/`, getItems)



export default router