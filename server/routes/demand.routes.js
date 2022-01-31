import express from 'express'
import authCtrl from '../controllers/auth.controller'
import demandCtrl from '../controllers/demand.controller'
const router = express.Router()

router.route('/api/demand/')
    .get(authCtrl.requireSignin,demandCtrl.list)
    .post(authCtrl.requireSignin,authCtrl.hasRoleBasedAuthorization("Admin"),demandCtrl.create)
router.route('/api/demand/chart_data')
    .get(authCtrl.requireSignin,authCtrl.hasEmployeeAuthorization,demandCtrl.getChartDate)

router.route('/api/demand/:demandId')
    .get(authCtrl.requireSignin,authCtrl.hasRoleBasedAuthorization("Admin"),demandCtrl.read)
    .put(authCtrl.requireSignin,authCtrl.hasRoleBasedAuthorization("Admin"),demandCtrl.update)
    .delete(authCtrl.requireSignin,authCtrl.hasRoleBasedAuthorization("Admin"),demandCtrl.remove)
router.param('demandId',demandCtrl.demandByID)

export default router