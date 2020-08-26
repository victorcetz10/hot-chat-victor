import jwt from 'jsonwebtoken'
import moment from 'moment'

const SECRET_TOKEN:string = process.env.SECRET_TOKEN || `secretStringToken`

export interface IPayload {
    id:string,
    role:string|undefined
}

export const sign = (payload:IPayload, daysAdded?:number):string => {
    
    return jwt.sign(payload, SECRET_TOKEN, {
        expiresIn: moment().add(daysAdded || 14, 'days').unix()
    })
}

export const verify = (token:string):IPayload|undefined => {
    try {
        return jwt.verify(token, SECRET_TOKEN) as IPayload
    } catch (error) {
        return undefined
    }
}