import { Router } from "express";
const router = Router()
import { getItems, getItem} from'../controllers/technologies.js';






router.get(`/`, getItems)

router.get(`/:id`, getItem);

export default router