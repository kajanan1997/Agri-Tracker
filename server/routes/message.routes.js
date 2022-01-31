import express from 'express'
import messageCtrl from "../controllers/message.controller"
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/message')
    .post(authCtrl.requireSignin,messageCtrl.create)
    .get(authCtrl.requireSignin,messageCtrl.list)
router.route('/api/message/:messageId')
    .delete(authCtrl.requireSignin,messageCtrl.remove)


export default router