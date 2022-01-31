import Feedback from "../models/feedback.model"
import errorHandler from "../helpers/dbErrorHandler";


const create = async (req, res) => {
    const feedback = new Feedback(req.body)
    try {
        await feedback.save()
        return res.status(200).json({
            "message":"Feedback added successfully"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req,res)=>{
    try {
        let feedBacks = await Feedback.find()
        await res.json(feedBacks)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try {
        let feedback = await Feedback.findById(req.params.feedBackId)
        let deletedFeedBack = await feedback.remove()
        res.json(deletedFeedBack)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
export default {
    create,
    list,
    remove
}