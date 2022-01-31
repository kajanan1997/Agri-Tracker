import Message from "../models/message.model"
import errorHandler from "../helpers/dbErrorHandler";


const create = async (req, res) => {
    const message = new Message(req.body.message)
    message.to = {
        _id:req.body.to
    }
    message.from = {
        _id:req.auth._id
    }
    try {
        await message.save()
        return res.status(200).json({
            "message":"Message sent successfully"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req,res)=>{
    try {
        let id = req.auth._id
        let receivedMessages = await Message.find({
            to:{
                _id:id
            }
        }).populate("to","_id name")
            .populate("from","_id name")
            .exec()
        let sentMessages = await Message.find({
            from:{
                _id:id
            }
        }).populate("to","_id name").populate("from","_id name").exec()

        await res.json({
            receivedMessages:receivedMessages,
            sentMessages:sentMessages
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try {
        let message = await Message.findById(req.params.messageId)
            let deletedMessage = await message.remove()
            res.json(deletedMessage)

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