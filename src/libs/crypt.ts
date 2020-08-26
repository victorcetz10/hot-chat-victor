import bcrypt from 'bcrypt'

export const compare = async (plainPwd:string, cryptPwd:string):Promise<boolean> => {
    return await bcrypt.compare(plainPwd, cryptPwd)
}

export const hash = async (data:string):Promise<string> => {
    let salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(data, salt)
}