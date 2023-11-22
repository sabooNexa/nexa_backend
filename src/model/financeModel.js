const mongoose = require("mongoose")

const financeSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim :true
    },
    name:{
        type:String,
        require:true,
        trim :true
    },
    phone:{
        type:String,
        require:true,
        trim :true
    },
    leadFrom: {
        type: String,
        default: "Finance",
      },
      date: {
        type: String,
      },
      time: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      deletedAt: {
        type: Date,
      },
},{timestamps:true})

module.exports = mongoose.model("finance",financeSchema)
// email:"testing@gmail.com"
// name:"testing-2"
// phone:"9014340527"