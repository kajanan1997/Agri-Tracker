import Demand from '../models/demand.model'
import _ from 'lodash'
import dbErrorHandler from './../helpers/dbErrorHandler'
import errorHandler from "../helpers/dbErrorHandler";

const create  = (req,res,next) => {
    const demand_detail=new Demand(req.body)
    demand_detail.save((err,result)=>{
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

const demandByID = (req, res, next, id) => {
    Demand.findById(id).exec((err, harvest) => {
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
    Demand.find((err, demands) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(demands)
    })
}

const remove = (req, res, next) => {
    let demand = req.detail
    demand.remove((err, deletedDemand) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(deletedDemand)
    })
}

const update = (req, res, next) => {
    let demand = req.detail
    demand = _.extend(demand, req.body)
    demand.updated = Date.now()
    demand.save((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(demand)
    })
}
const getChartDate = async (req,res,next)=>{
    try{
        const start = new Date("2021-01-01").getFullYear()
        const data = await Demand.aggregate([
            {
                $match:{
                    "demand_year":start
                }
            },{
                $project:{
                    _id:0,
                    province:1,
                    vegetable_type:1,
                    demand_amount:1,
                }
            }
        ])
        return res.status(200).json(data)
    }catch (e) {
       console.log(e)
        return res.status(400).json({
           "error":"pipeline error"
        })
    }
}
export default {
    create,
    read,
    list,
    remove,
    demandByID,
    update,
    getChartDate
}