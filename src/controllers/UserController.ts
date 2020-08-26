import {Router, Request, Response} from 'express'
import UserModel from '../models/userModel'
import {sign} from '../libs/jwt'
import { isUserAuth, checkUserRole, ADMIN_ROLE } from '../middlewares/UserAuth'

export default class UserController {
    
    public router():Router{
        let router = Router()

        router.get('/', isUserAuth, checkUserRole(ADMIN_ROLE), this.find)

        router.post('/signin', this.insert)

        router.post('/login', this.login)

        

        return router
    }

    private async login(req:Request, res:Response):Promise<Response>{
        try {
            let {nick_name, password} = req.body
            let user = await UserModel.findOne({nick_name: nick_name, account_activated:true})

            if(!user) return res.status(400).json({message: `nick name not found`})
            
            let checkPassword = await user.comparePassword(password)

            if(!checkPassword) return res.status(400).json({message:`password incorrect`})
            
            let token = sign({id: user._id, role: user.role })

            return res.status(200).send({message: `login successfully`, user, token})
        } catch (error) {
            return res.status(400).json({message: `error to try user login in`, error})
        }
    }

    private async insert(req:Request, res:Response):Promise<Response>{
        try {
            
            let {email, nick_name, password} = req.body
            
            let model = new UserModel({
                email,
                nick_name,
                password
            })
            
            let newUser = await model.save()
            
            return res.status(201).json({message: `user was inserted successfully`})

        
        } catch (error) {
            return res.status(400).json({message: `error to try insert user`, error})
        }
    }

    private async update(req:Request, res:Response):Promise<Response>{
        try {
            let userAuth = req.user

            if(!userAuth) return res.status(400).json({message: `authorization id not found`})

            let {email, nick_name, password} = req.body
            let user = await UserModel.findOneAndUpdate({_id: userAuth.id}, {email, nick_name, password}, {new: true})
            return res.status(200).json({message: `user was updated successfully`, user})
        } catch (error) {
            return res.status(400).json({message: `error to try update user`, error})
        }
    }

    private async delete(req:Request, res:Response){
        try {
            let userID = req.params.id
            if(!userID) return res.status(400).json({message: `id pararm missing`})

            let user = await UserModel.findOneAndDelete({_id: userID})
            return res.status(200).json({message: `user was removed successfully`, user})
        } catch (error) {
            return res.status(400).json({message: `errot to try remove user`, error })
        }
    }

    private async findOne(req:Request, res:Response):Promise<Response>{
        try {
            let key = req.params.key
            let value = req.params.value
            
            if(!key || !value) return res.status(400).json({message: `missing params. key and value are required`})

            let matchKey=/nick|email/
            if(!matchKey.test(key)) return res.status(400).json({message: `invalid key`})
            
            let condition = key.toLowerCase()=='nick' ? {nick_name: value} : {email: value}
            
            let user = await UserModel.findOne(condition)
            return res.status(200).json({user})
        } catch (error) {
            return res.status(400).json({message:`erro to try find one user`, error})
        }

    }

    private async find(req:Request, res:Response){
        try {
            
        } catch (error) {
            return res.status(400).json({message: `errot to try fin users`, error})
        }
    }
}