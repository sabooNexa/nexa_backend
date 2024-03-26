const mongoose = require("mongoose")
const insuranceSchema = new mongoose.Schema({
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
    allQuery :{
      type :Array,
      trim:true
    },
  error :{
      type :Array,
      trim:true
    },
    leadFrom: {
        type: String,
        default: "Isurance",
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
module.exports= mongoose.model("insurance",insuranceSchema)


// email:"testing@gmail.com"
// name:"testing-2"
// phone:"9014340527"