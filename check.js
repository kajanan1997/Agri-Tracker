const mongoose = require("mongoose")
const Message = require("./server/models/message.model")
mongoose.connect("mongodb+srv://Kajanan:kajanan1234@cluster0.bxsuc.mongodb.net/agriculture-app",{useNewUrlParser: true, useUnifiedTopology: true}).then(
    ()=>{
        console.log("success")

    }
).catch((err)=>{
    console.log(err)
})

Message.find()

