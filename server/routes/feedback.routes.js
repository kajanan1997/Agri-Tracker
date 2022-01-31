import express from 'express'
import feedbackCtrl from "../controllers/feedback.controller"
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/feedback')
    .post(feedbackCtrl.create)
    .get(feedbackCtrl.list)
router.route('/api/feedback/:feedBackId')
    .delete(authCtrl.requireSignin,authCtrl.hasRoleBasedAuthorization("Admin"),feedbackCtrl.remove)


export default router