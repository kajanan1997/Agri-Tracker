import mongoose from 'mongoose'

const DemandSchema = new mongoose.Schema({
    demand_amount: {
       type:Number,
        required: "Demand amount is required"
    } ,
    vegetable_type:{
        type:String,
        lowercase:true,
        trim:true,
        required:'type need to provided'
    },
    demand_year:{
        type:Number,
        required:"Year is required",
        min:[1970,"We do not allow addition of demand for years below 1970"],
        max:[new Date().getFullYear(),"You can't forecast future values "]
    },
    province:{
        type:String,
        enum:["Northern","Western","Eastern","North Central","Central","North Western","Southern","Uva","Sabragamuwa"],
        required:"Province is required"
    }
})


export default mongoose.model('Demand',DemandSchema)