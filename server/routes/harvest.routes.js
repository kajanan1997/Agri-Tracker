import express from 'express'
import authCtrl from '../controllers/auth.controller'
import harvestCtrl from '../controllers/harvest.controller'
const router = express.Router()

router.route('/api/harvest')
    .get(authCtrl.requireSignin,harvestCtrl.list)
    .post(authCtrl.requireSignin,harvestCtrl.create)
router.route("/api/harvest/chart_data")
    .get(authCtrl.requireSignin,authCtrl.hasEmployeeAuthorization,harvestCtrl.getChartData)
router.route('/api/harvest/:harvestId')
    .get(authCtrl.requireSignin,harvestCtrl.read)
    .put(authCtrl.requireSignin,harvestCtrl.update)
    .delete(authCtrl.requireSignin,harvestCtrl.remove)

router.param('harvestId',harvestCtrl.harvestByID)

export default router