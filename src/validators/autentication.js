import {check} from 'express-validator'
import {validateResult, verificarLargo} from '../helpers/validateHelper.js'

export const validateCreate = [
    check('name')
        .exists()
        .custom(verificarLargo)
        .not()
        .isEmpty(),

    check('surname')
        .exists()
        .custom(verificarLargo)
        .not()
        .isEmpty(),

    check('email')
        .exists()
        .custom((value, {req})=>{
            if(value.length>51 ){
                throw new Error('error al ingresar el: sobrepasa el limite de caracteres')
            }
            else{return true}
        })
        .isEmail()
        .not()
        .isEmpty(),

    check('password')
        .exists()
        .custom(verificarLargo)
        .not()
        .isEmpty(),

    (req, res, next) =>{
        validateResult(req, res, next)        
    }
]


export default {validateCreate};
