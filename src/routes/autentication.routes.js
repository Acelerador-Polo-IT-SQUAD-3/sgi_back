import { Router } from "express";
const router = Router()
import {createItem, login} from'../controllers/autentication.js';


router.post(`/`, createItem)
router.get(`/login`, login);

export default router