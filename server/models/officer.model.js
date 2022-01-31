import mongoose from 'mongoose'

const OfficerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }

})
export  default  mongoose.model("Officer",OfficerSchema)