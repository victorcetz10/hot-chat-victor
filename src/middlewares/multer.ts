import {Request, Response, NextFunction} from 'express'
import multer, {diskStorage, StorageEngine} from 'multer'
import {v4} from 'uuid'
import path from 'path'

const filenameFunction = (file:Express.Multer.File, cb:Function) => {
    let ext = path.extname(file.originalname)        
    return cb(null, `${v4()}.${ext}`)
}

const privateStorage:StorageEngine = diskStorage({
    destination: path.resolve('uploads/private'),
    filename: function(req, file:Express.Multer.File, cb:Function){        
        fileFilterFunction(file, cb)
    }
})

const publicStorage:StorageEngine = diskStorage({
    destination: path.resolve('uploads/public'),
    filename: function(req, file, cb:Function){
        filenameFunction(file, cb)
    }
})



const filesTypes = /jpeg|jpg|png|gif/

const fileFilterFunction = (file:Express.Multer.File, cb:Function) => {
    let ext = filesTypes.test(path.extname(file.originalname))
    let mime = filesTypes.test(file.mimetype)

    if(ext && mime) return cb(null, true)

    cb(`only  jpeg, jpg, png and gif images accepted`, false)
}




export const sigleSaveMiddleware = (saveLikePublic:boolean)=>{
    let storageEngine:StorageEngine = saveLikePublic ? publicStorage : privateStorage

    return (req:Request, res:Response, next:NextFunction) => {
        return multer({
            storage: storageEngine,
            fileFilter: (req, file, cb:Function) =>{

                fileFilterFunction(file, cb)

            },
        }).single('image')(req, res, next)
    }
}


export const multipleSaveMiddleware = (saveLikePublic:boolean)=>{
    let storageEngine:StorageEngine = saveLikePublic ? publicStorage : privateStorage

    return (req:Request, res:Response, next:NextFunction) => {
        return multer({
            storage: storageEngine,
            fileFilter: (req, file, cb:Function) =>{

                fileFilterFunction(file, cb)

            },
        }).array('images', 5)(req, res, next)
    }
}