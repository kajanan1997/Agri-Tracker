import mongoose from 'mongoose'




const HarvestSchema = new mongoose.Schema({
    farmer_name:{
        type: String,
        trim: true,
        required: 'Name is required'
    },
    officer_name:{
        type:String,
        trim:true,
        required:'Officer name is required'
    },
    address:{
        type:String,
        required:'address is required'
    },
    contact_no:{
        type:Number,
        required:'Number is required'
    },
    vegetable_type:{
        type:String,
        trim:true,
        required:'type need to provided',
        lowercase:true
    },
    vegetable_grade:{
        type:String,
        required:"Grade is required",
        enum:['A','B','C','D']
    },
    plant_date:{
        type:Date,
        required:"plant date is required",
    },

    harvest_date:{
        type:Date,
        required:"harvest date is required",
        validate:{
            validator:function(value){
                return this.plant_date<=value
            },
            message:"Harvest date should be greater that plant date "
        }
    },
    amount:{
        type:Number,
        required:"Amount in required",
        min:0,
    },
    province:{
        type:String,
        required:"Province is required",
        enum: ["Northern","Western","Eastern","North Central","Central","North Western","Southern","Uva","Sabragamuwa"],
    },
    division:{
        type:String,
        required:"Division is required"
    }
})


export default mongoose.model('Harvest',HarvestSchema)