import { Router } from "express";
const router = Router()
import {createItem, login} from'../controllers/autentication.js';
import {validateCreate} from '../validators/autentication.js'


router.post(`/`, validateCreate, createItem)
router.get(`/login`, login);

export default router