import express from 'express'
import authCtrl from '../controllers/auth.controller'
import newsCtrl from '../controllers/news.controller'
const router = express.Router()

router.route('/api/news')
    .get(authCtrl.requireSignin,newsCtrl.list)
    .post(authCtrl.requireSignin,authCtrl.hasRoleBasedAuthorization("Admin"),newsCtrl.create)

router.route('/api/news/:newsId')
    .get(authCtrl.requireSignin,newsCtrl.read)
    .put(authCtrl.requireSignin,authCtrl.hasRoleBasedAuthorization("Admin"),newsCtrl.update)
    .delete(authCtrl.requireSignin,authCtrl.hasRoleBasedAuthorization("Admin"),newsCtrl.remove)
router.param('newsId',newsCtrl.newsByID)

export default router