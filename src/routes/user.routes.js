import { Router } from "express";
const router = Router()
import { getItems, getItem, createItem, updateItem, deleteItem } from'../controllers/users.js';





router.get(`/`, getItems)

router.get(`/:id`, getItem);

router.post(`/`, createItem)

router.patch(`/:id`, updateItem)

router.delete(`/:id`, deleteItem)

export default router