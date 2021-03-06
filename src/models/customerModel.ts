import {Schema, model, Document} from 'mongoose'
import {hash} from '../libs/crypt'


const customerSchema = new Schema({
    email:{type:String, required:true, unique:true},
    password: {type:String, required:true},
    nick_name: {type:String, lowercase:true, required: true, unique:true},
    first_name: {type:String, lowercase:true, required:true},
    last_name:  {type:String, lowercase:true, required:true},
    born_date: {type:Date, required:true},
    i_am: {type: String, required: true},
    looking_for: {type:String, required: true},
    orientation: {type:String, required:true},
    picture: String,
    height: Number,
    weight: Number,
    hair_color:String,
    eye_color:String,
    body_art:String,
    ethnicity: String,
    living:String,
    drinking_habits: Boolean,
    religion: String,
    education:String,
    childrens:Number,
    smoking_habits:Boolean,
    zodiac_sign:String,
    body_style:String,
    status:String,
    timestamp: {type:Date, default:Date.now()}

})

export interface ICustomer extends Document {
    email:string
    password:string
    nick_name:string
    first_name:string
    last_name:string
    born_date:Date
    i_am:string
    looking_for:string
    orientation:string
    picture:string
    height:number
    weight:number
    hair_color:string
    eye_color:string,
    body_art:string
    ethnicity:string
    living:string
    drinking_habits:boolean
    religion:string
    education:string
    childrens:number
    smoking_habits:boolean
    zodiac_sign:string
    body_style:string
    status:string
    timestamp:Date
}


customerSchema.pre<ICustomer>('save', async function(next){
    let customer = this

    if(!customer.isModified('password')) return next()

    customer.password = await hash(customer.password)

    next()
})

export default model<ICustomer>('customer', customerSchema)