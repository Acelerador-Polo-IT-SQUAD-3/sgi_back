import { Router } from "express";
const router = Router()
import { getItems, getItem, updateItem, deleteItem, asignacionEquipos } from'../controllers/users.js';
import {validateUser} from '../validators/user.js'





router.get(`/`, getItems)

router.get(`/:id`, getItem);

router.patch(`/:id`, validateUser, updateItem)

router.patch(`/del/:id`, deleteItem)

router.post(`/get/user/tech`, asignacionEquipos)

export default router