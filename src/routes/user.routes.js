import { Router } from "express";
const router = Router()
import { getItems, getItem, updateItem, deleteItem } from'../controllers/users.js';
import {validateUpdate} from '../validators/user.js'





router.get(`/`, getItems)

router.get(`/:id`, getItem);


router.patch(`/:id`, validateUpdate, updateItem)

router.delete(`/:id`, deleteItem)

export default router