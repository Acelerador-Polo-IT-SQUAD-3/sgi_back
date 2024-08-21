import {check} from 'express-validator'
import {validateResult} from '../helpers/validateHelper.js'
export const validateUpdate = [
    check('name')
        .exists()
        .not()
        .isEmpty(),

    check('surname')
        .exists()
        .not()
        .isEmpty(),

    check('dni')
        .exists()
        .isNumeric()
        .not()
        .isEmpty(),

    check('description')
        .exists()
        .not()
        .isEmpty(),

    check('email')
        .exists()
        .isEmail()
        .not()
        .isEmpty(),

    check('password')
        .exists()
        .not()
        .isEmpty(),

    check('role_id')
        .exists()
        .isNumeric()
        .custom((value, {req})=>{
            if(value <1 || value>3 ){
                throw new Error('error al ingresar el rol')
            }
            else{return true}
        })
        .not()
        .isEmpty(),

    (req, res, next) =>{
        validateResult(req, res, next)        
    }
]


export default {validateUpdate};