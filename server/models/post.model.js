import mongoose from 'mongoose'
const PostSchema = new mongoose.Schema({
    heading:{
        type:String,
        required:"Heading is required"
    },
    content:{
        type:String,
        required:"Content is required"
    },
    comments:[
        {
            commentContent:{
                type:String,
                required:"Comment content is required"
            },
            timestamp:{
                type:Date,
                default:Date.now
            },
            commentedBy:{
                type:mongoose.Schema.ObjectId,
                ref:'User'
            }
        }
    ],
    createdAt:{
       type:Date,
       default: Date.now
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
})

export default mongoose.model('Post',PostSchema)