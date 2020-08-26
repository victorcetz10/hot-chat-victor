import {Request, Response, Router} from 'express'
import router from '../routes'

export default class ChatController {

    public router():Router{
        let route = Router()

        return router
    }

    private insert(req:Request, res:Response){}
}