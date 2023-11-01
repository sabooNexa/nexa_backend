const serviceModel =require("../model/serviceModel")

const moment = require("moment");
require("moment-timezone");

const service = async (req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        let data = req.body;
    
        moment.tz.setDefault("Asia/Kolkata");
        let dates = moment().format("YYYY-MM-DD");
        let times = moment().format("HH:mm:ss");
        data.date = dates;
        data.time = times;
        let savedata = await serviceModel.create(data);
        res.status(201).send({ status: true, data: savedata });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
      }
}
//===============================================================================
let getService = async (req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const filter = req.query;
    const sortOptions = {};
    let data = [];

    if (Object.keys(filter).length === 0) {
      // No query parameters provided
      sortOptions.createdAt = -1;
      data = await serviceModel
        .find({
          isDeleted: false,
        })
        .sort(sortOptions);
    } else {
      const filterDate = filter.date;
      // const formattedDate = moment(filterDate, "DD/MM/YYYY").format("MM/DD/YYYY");
      data = await serviceModel.aggregate([
        {
          $match: {
            isDeleted: false,
            date: filterDate,
          },
        },
        { $group: { _id: "$Phone", doc: { $first: "$$ROOT" } } },
        { $replaceRoot: { newRoot: "$doc" } },
        // { $sort: { createdAt: -1 } },
      ]);
    }
return res.status(200).send({status:true,data:data})
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}
//============================================================================
const dupeService =async (req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const repeatedPhoneNumbers = await serviceModel.aggregate([
      {
        $group: {
          _id: {
            number: "$phone",
            date: "$date",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the result
          number: "$_id.number",
          date: "$_id.date",
          count: 1,
        },
      },
      { $match: { count: { $gt: 1 } } },
    ]);

    return res.status(200).send({ status: true, data: repeatedPhoneNumbers });
  } catch (error) {
    
  }
}
//===========================================================================================
const serviceUniqueEntries = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let  data = await serviceModel.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            date: "$date",
            Phone: "$phone",
           
          },
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $sort: { createdAt: -1 } },
    ]);
    return res.status(200).send({ status: true, data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//=========================================================================================
const serviceRangeData = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const { startDate, endDate } = req.body; // Assuming startDate and endDate are provided in the request body

    let data = await serviceModel.aggregate([
      {
        $match: {
          isDeleted: false,
          $expr: {
            $and: [
              { $gte: ["$date", startDate] },
              { $lte: ["$date", endDate] }
            ]
          }
        }
      },
      {
        $group: {
          _id: {
            date: "$date",
            Phone: "$phone",
            
          },
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).send({ status: true, data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//=======================================================================================
module.exports ={service , getService , dupeService , serviceUniqueEntries , serviceRangeData}