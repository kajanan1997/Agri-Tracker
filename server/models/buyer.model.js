import mongoose from 'mongoose'

const BuyerSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }

    })
export  default  mongoose.model("Buyer",BuyerSchema)