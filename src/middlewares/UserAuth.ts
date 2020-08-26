//user authorization middleware

import {Request, Response, NextFunction} from 'express'
import {verify, IPayload} from '../libs/jwt'
import userModel from '../models/userModel'

export const isUserAuth = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        let authorization = req.headers.authorization
        
        if(!authorization) return res.status(401).json({message: `missing authorization header`})

        if(!authorization.startsWith('Bearer ')) return res.status(401).json({message: `missing "Bearer" into authorization string`})

        let token = authorization.split(' ')[1]
        let payload:IPayload|undefined = verify(token)
        
        if(payload===undefined) return res.status(401).json({message: `token verification returns undefined value`})

        let user = await userModel.findOne({_id: payload.id}, '_id role')

        if(!user) return res.status(401).json({message: `user not found`})

        req.user = {
            id: user._id,
            role: user.role
        }

        return next()

    } catch (error) {
        res.status(400).json({message: `error catch to try check user token`, error})
    }
}


export const CS_ROLE:string = 'cs', QA_ROLE:string = 'qa',  ADMIN_ROLE:string = 'admin'

export const checkUserRole = (role:string) => {
    return (req:Request, res:Response, next:NextFunction) => {
        
        if(!req.user) return res.status(401).json({message: `session has expired`})

        if(req.user.role != role) return res.status(401).json({message: `access denied, not enough privileges`})

        return next()

    }
}