import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import postCtrl from '../controllers/post.controller'

const router = express.Router()

router.route('/api/posts/new/:userId')
    .post(authCtrl.requireSignin, postCtrl.create)
router.route('/api/posts/')
    .get(authCtrl.requireSignin,postCtrl.list)

router.route('/api/posts/comment')
    .put(authCtrl.requireSignin, postCtrl.addComment)
router.route('/api/posts/remove-comment')
    .put(authCtrl.requireSignin, postCtrl.removeComment)
router.route('/api/posts/:postId')
    .get(authCtrl.requireSignin,postCtrl.read)
    .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove)
router.param('userId',userCtrl.userByID)
router.param('postId',postCtrl.postByID)
export default router