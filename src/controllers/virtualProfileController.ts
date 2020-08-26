import {Router, Request, Response} from 'express'
import VirtualProfileModel from '../models/virtualProfileModel'
import {sign} from '../libs/jwt'

export default class VirtualProfileController {

    public router():Router{
        let router = Router()
        router.post('/virtualprofile', this.insert)
        return router
    }

    private async insert(req:Request, res:Response):Promise<Response>{
        try {
            
            let {nick_name, first_name, last_name, born_date, looking_for, orientation, picture, height, weight, hair_color, eye_color, body_art, ethnicity, living, drinking_habits, religion, education, childrens, smoking_habits, zodiac_sign, body_style, status} = req.body
            
            let model = new VirtualProfileModel({
                nick_name,
			    first_name,
			    last_name,
			    born_date,
			    looking_for,
			    orientation,
			    picture,
			    height,
			    weight,
			    hair_color,
			    eye_color,
			    body_art,
			    ethnicity,
			    living,
			    drinking_habits,
			    religion,
			    education,
			    childrens,
			    smoking_habits,
			    zodiac_sign,
			    body_style,
			    status,
            })
            
            let newVirtualProfile = await model.save()
            
            return res.status(201).json({message: `virtual profile was inserted successfully`})

        
        } catch (error) {
            return res.status(400).json({message: `error to try insert virtual profile`, error})
        }
    }

    private async update(req:Request, res:Response):Promise<Response>{
        try {
            let virtualProfileAuth = req.virtualprofile

            if(!virtualProfileAuth) return res.status(400).json({message: `authorization id not found`})

            let {nick_name, first_name, last_name, born_date, looking_for, orientation, picture, height, weight, hair_color, eye_color, body_art, ethnicity, living, drinking_habits, religion, education, childrens, smoking_habits, zodiac_sign, body_style, status} = req.body
            let virtualprofile = await VirtualProfileModel.findOneAndUpdate({_id: virtualProfileAuth.id}, {nick_name, first_name, last_name, born_date, looking_for, orientation, picture, height, weight, hair_color, eye_color, body_art, ethnicity, living, drinking_habits, religion, education, childrens, smoking_habits, zodiac_sign, body_style, status}, {new: true})
            return res.status(200).json({message: `virtual profile was updated successfully`, virtualprofile})
        } catch (error) {
            return res.status(400).json({message: `error to try update virtual profile`, error})
        }
    }

    private async delete(req:Request, res:Response){
        try {
            let virtualProfileID = req.params.id
            if(!virtualProfileID) return res.status(400).json({message: `id pararm missing`})

            let virtualprofile = await VirtualProfileModel.findOneAndDelete({_id: virtualProfileID})
            return res.status(200).json({message: `virtual profile was removed successfully`, virtualprofile})
        } catch (error) {
            return res.status(400).json({message: `errot to try remove virtual profile`, error })
        }
    }

    private async findOne(req:Request, res:Response):Promise<Response>{
       

    }

    private async find(req:Request, res:Response){
        try {
            
        } catch (error) {
            return res.status(400).json({message: `errot to try fin virtual profile`, error})
        }
    }
}