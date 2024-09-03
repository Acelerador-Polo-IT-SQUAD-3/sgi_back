import { Router } from "express";
const router = Router()
import { getItems, getItem} from'../controllers/roles.js';






router.get(`/`, getItems)

router.get(`/:id`, getItem);

export default router