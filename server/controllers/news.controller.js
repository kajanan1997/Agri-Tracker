import News from '../models/news.model'
import _ from 'lodash'
import dbErrorHandler from './../helpers/dbErrorHandler'

const create  = (req,res,next) => {
    const news_detail=new News(req.body)
    news_detail.save((err,result)=>{
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

const newsByID = (req, res, next, id) => {
    News.findById(id).exec((err, news) => {
        if (err || !news)
            return res.status('400').json({
                error: "Details not found"
            })
        req.detail = news
        next()
    })
}

const read = (req, res) => {
    return res.json(req.detail)
}
const list = (req, res) => {
    News.find((err, news) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
        res.json(news)
    })
}

const remove = (req, res, next) => {
    let news = req.detail
    news.remove((err, deletedNews) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
        res.json(deletedNews)
    })
}

const update = (req, res, next) => {
    let news = req.detail
    news = _.extend(news, req.body)
    news.updated = Date.now()
    news.save((err) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
        res.json(news)
    })
}

export default {
    create,
    read,
    list,
    remove,
    newsByID,
    update
}