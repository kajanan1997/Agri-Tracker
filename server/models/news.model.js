import mongoose from 'mongoose'

const NewsSchema = new mongoose.Schema({
    news_heading:{
        type: String,
        trim: true,
        required: 'Heading is required'
    },
    content:{
        type:String,
        trim:true,
        required:'Content is required'
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date

})
export default mongoose.model('News',NewsSchema)