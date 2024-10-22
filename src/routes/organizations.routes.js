import { Router } from "express";
const router = Router()
import { getItems} from'../controllers/organizations.js';

router.get(`/`, getItems)

export default router