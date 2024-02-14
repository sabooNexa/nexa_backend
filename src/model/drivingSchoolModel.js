const mongoose = require("mongoose")
const drivingSchoolSchema = new mongoose.Schema({
    name:{                              
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    outlet:{
        type:String,
        require:true
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
        default:"Driving School"
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

module.exports = mongoose.model("drivingSchool",drivingSchoolSchema)









// email: "testing@gmail.com"
// name: "testing-2"
// outlet: "MARUTI SUZUKI DRIVING SCHOOL"
// phone: "9014340527"