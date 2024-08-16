import { Router } from "express"
import {pool} from '../database.js'
import * as fs from 'node:fs';
const router = Router()


const pathRouter = 'src/routes'

fs.readdirSync(pathRouter).filter((file)=> {
console.log('--->', file)
})

router.get('/ping', async (req, res) => {
    const [result] = await  pool.query('SELECT * FROM test') 
    res.json(result[0])
  } );



export default router