import {Schema, model, Document} from 'mongoose'
import { IChat } from './chatModel'
import { ICustomer } from './customerModel'
import { IVirtualProfile } from './virtualProfileModel'
import { IUser } from './userModel'

const mediaSchema = new Schema({
    type: String,
    url: String
})

export interface IMedia {
    type:string
    url:string
}

const messageSchema = new Schema({
    chat: {type: Schema.Types.ObjectId, ref:'chat', required: true},
    customer: {type:Schema.Types.ObjectId, ref: 'customer', required: true},
    virtual: {type:Schema.Types.ObjectId, ref: 'virtual', required:true}, 
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    message: {type: String, required: true},
    customer_write: Boolean,
    reported: {type:Boolean, default:false},
    media: {type: [mediaSchema]},
    timestamp: {type: Date, default:Date.now()}
})


export interface IMessage extends Document {
    chat:IChat
    customer:ICustomer
    virtual:IVirtualProfile
    user:IUser
    message:string
    customer_write:boolean
    reported:boolean
}

export default model<IMessage>('message', messageSchema)