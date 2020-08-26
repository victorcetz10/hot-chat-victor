import {Router} from 'express'

import {userCtrl, customerCtrl, virtualCtrl, chatCtrl, messageCtrl} from '../controllers'


const router:Router = Router()

//user routes 
router.use('/users', userCtrl.router)

//customer routes
router.use('/customer', customerCtrl.router)

//virtual profile routes
router.use('/virtual', virtualCtrl.router)

//chat routes
router.use('/chat', chatCtrl.router)

//message routes
router.use('/message', messageCtrl.router)


export default router