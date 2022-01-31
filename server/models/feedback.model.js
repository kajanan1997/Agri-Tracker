import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: 'Name is required'
    },
    subject:{
        type:String,
        trim:true,
        required:"Subject is required"
    },
    content:{
        type:String,
        trim:true,
        required:'Content is required'
    },
    timestamp:{
        type:Date,
        default:Date.now
    },

})
export default mongoose.model('Feedback',FeedbackSchema)