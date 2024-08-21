import {validationResult} from 'express-validator'

export const validateResult = (req, res, next) => {
    try{
        validationResult(req).throw()
        return next()
    } catch (err){
        res.status(403)
        res.send({errors: err.array()})
    }
};

export const verificarLargo = (value, {req})=>{
    if(value.length>256 ){
        throw new Error('error al ingresar el : sobrepasa el limite de caracteres');
    };
    return true;
};

export default {validateResult, verificarLargo};