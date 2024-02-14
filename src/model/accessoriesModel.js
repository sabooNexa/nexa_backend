const mongoose = require("mongoose");
const AccessoriesSchema = new mongoose.Schema(
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
      //models
      type: String,
      trim: true,
    },
    product:{
      type: String,
      trim: true,
    },
    email: {
      //outlet
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
    leadFrom: {
      type: String,
      default: "Accessories",
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
module.exports = mongoose.model("Accessories",AccessoriesSchema)
// email: "testing@gmail.com";