import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    to:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    from:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    subject:{
        type:String,
        trim:true,
        required:"Subject is required"
    },
    message:{
        type:String,
        trim:true,
        required:'Content is required'
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
})
export default mongoose.model('Message',MessageSchema)