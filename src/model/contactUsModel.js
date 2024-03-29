const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
        trim: true,
      },
      email: {
        type: String,
        require: true,
        trim: true,
      },
      phone: {
        type: String,
        // require:true,
        trim: true,
      },
      model: {
        type: String,
        trim: true,
      },
  
      outlet: {
        type: String,
        trim: true,
      },
      message: {
        type: String,
        trim: true,
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
        default: "Contact Us",
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      date: {
        type: String,
      },
      time: {
        type: String,
      },
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("contactUs", contactSchema);


// email:"testing@gmail.com"
// message:""
// model:"INVICTO"
// name:"testing-2"
// phone:"9014340527"