import { Router } from "express";
const router = Router()
import { getItems, getItem, updateItem, deleteItem } from'../controllers/users.js';





router.get(`/`, getItems)

router.get(`/:id`, getItem);


router.patch(`/:id`, updateItem)

router.delete(`/:id`, deleteItem)

export default router