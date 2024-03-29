const mongoose = require('mongoose')

const popupSchema = new mongoose.Schema({
   
    phone:{
        type:String,
        require:true
    },
    leadFrom : {
        type: String,
        default:"PopUp"
       },

    allQuery :{
        type :Array,
        trim:true
      },
    error :{
        type :Array,
        trim:true
      },
    date:{
        type: String,
    },
    time :{
        type:String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    },
},{timestamps:true})
module.exports = mongoose.model("popup", popupSchema);

