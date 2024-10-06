import {check} from 'express-validator'
import {validateResult, verificarLargo} from '../helpers/validateHelper.js'

export const validateCreate = [
    check('name')
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

    /*check('role_id')
        .exists()
        .isNumeric()
        .custom((value, {req})=>{
            if(value <1 || value>3 ){
                throw new Error('error al ingresar el rol')
            }
            else{return true}
        })
        .not()
        .isEmpty(),*/

    (req, res, next) =>{
        validateResult(req, res, next)        
    }
]


export default {validateCreate};
