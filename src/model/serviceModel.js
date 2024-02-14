const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
      },
     
      phone: {
        type: String,
        trim: true,
      },
  
      model: {   //models
        type: String,
        trim: true,
      },
      serviceType: {   //models
        type: String,
        trim: true,
      },
      message:{
        type: String,
        trim: true,
      },
      email: {    //outlet
        type: String,
        trim: true,
      },
      outlet: {
        type: String,
        trim: true,
      },
      allQuery :{
        type :Array,
        trim:true
      },
    error :{
        type :String,
        trim:true
      },
      leadFrom : {
        type: String,
        default:"Service"
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
    },
    { timestamps: true }
)
module.exports= mongoose.model("service", serviceSchema);
 

// email: "testing@gmail.com"
// name: "testing-2"
// phone: "9014340527"
// pickup: "Nexa Service - Jubilee"