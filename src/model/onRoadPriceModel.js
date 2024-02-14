const mongoose = require("mongoose")
const OnroadPriceSchema = new mongoose.Schema(
    {
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
      email: {    //outlet
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
      leadFrom : {
        type: String,
        default:"On Road Price"
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
  module.exports = mongoose.model("onRoadPrice", OnroadPriceSchema);


// email: "testing@gmail.com"
// model: "Invicto"
// name: "testing-2"
// phone: 
// "9014340527"