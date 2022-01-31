import Harvest from '../models/harvest.model'
import _ from 'lodash'
import dbErrorHandler from './../helpers/dbErrorHandler'
import errorHandler from "../helpers/dbErrorHandler";

const create  = (req,res,next) => {
    const harvest_detail=new Harvest(req.body)
    harvest_detail.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error:dbErrorHandler.getErrorMessage(err)

            })
        }
        res.status(200).json({
            message:"successfully added"
        })

    })
}

const harvestByID = (req, res, next, id) => {
    Harvest.findById(id).exec((err, harvest) => {
        if (err || !harvest)
            return res.status('400').json({
                error: "Details not found"
            })
        req.detail = harvest
        next()
    })
}

const read = (req, res) => {
    return res.json(req.detail)
}
const list = (req, res) => {
    Harvest.find((err, harvests) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(harvests)
    }).select('farmer_name address contact_no vegetable_type vegetable_grade plant_date harvest_date amount officer_name province')
}

const remove = (req, res, next) => {
    let harvest = req.detail
    harvest.remove((err, deletedHarvest) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(deletedHarvest)
    })
}

const update = (req, res, next) => {
    let harvest = req.detail
    harvest = _.extend(harvest, req.body)
    harvest.updated = Date.now()
    harvest.save((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(harvest)
    })
}

const getChartData = async (req,res,next)=>{
    try {
        const today = new Date()
        const start = new Date(today.getFullYear(),0,1)
        const data = await Harvest.aggregate([
            {
                $match:{
                    harvest_date:{"$gte":start}
                }
            },
            {
                $project:{
                    _id:0,
                    province:1,
                    vegetable_type:1,
                    amount:1
                }
            },
            {
                $group:{
                    _id:{
                        vegetable_type:"$vegetable_type",
                        province:"$province"
                    },
                    total:{$sum:"$amount"}
                }
            }
        ])
        return res.status(200).json(data)
    }catch (e) {
        return res.status(400).json({
            "error":"Pipeline error "
        })
       console.log(e)
    }

}

export default {
    create,
    read,
    list,
    remove,
    harvestByID,
    update,
    getChartData
}