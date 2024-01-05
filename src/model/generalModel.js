const mongoose = require("mongoose")
const generalSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        trim: true,
      },
     
      phone: {
        type: String,
        trim: true,
      },
  
      model: {   
        type: String,
        trim: true,
      },
      outlet:{
        type: String,
        trim: true,
      },
      email: {   
        type: String,
        trim: true,
      },
      leadFrom : {
        type: String,
     require :true
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
  );
  module.exports = mongoose.model("general", generalSchema);

//   email: "testing@gmail.com"
//   model : "Test Drive"
//   name: "testing-2"
//   outlet:  ""
//   phone: "9014340527"