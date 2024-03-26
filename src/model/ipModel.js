const mongoose = require("mongoose")

const ipSchema = new mongoose.Schema({
    device_ip: {
        type: String,
        trim: true,
    },
    os: {
        type: String,
      trim: true,
    },
    browser: {
        type: String,
      trim: true,
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

module.exports= mongoose.model("ipAddress",ipSchema)

