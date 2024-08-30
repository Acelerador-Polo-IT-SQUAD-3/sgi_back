import { Router } from "express";
const router = Router()
import {createItem, getItems, getItem, updateItem, deleteItem } from'../controllers/members.js';


router.post(`/`, createItem)

router.get(`/`, getItems)

router.get(`/:id`, getItem);

router.patch(`/:id`,updateItem)

router.delete(`/:id`, deleteItem)


export default router