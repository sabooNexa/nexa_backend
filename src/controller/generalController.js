const generalModel = require("../model/generalModel");
const moment = require("moment");
require("moment-timezone");
const general = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;

    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("YYYY-MM-DD");
    let times = moment().format("HH:mm:ss");
    data.date = dates;
    data.time = times;
    let savedata = await generalModel.create(data);
    res.status(201).send({ status: true, data: savedata });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
//==========================================================================

const getGenerals = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const filter = req.query;
    const sortOptions = {};
    let data = [];

    if (Object.keys(filter).length === 0) {
      // No query parameters provided
      sortOptions.createdAt = -1;
      const data = await generalModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      const filterDate = filter.date;

      data = await generalModel.aggregate([
        { $match: { isDeleted: false, date: filterDate } },
        {
          $group: {
            _id: {
              date: "$date",
              mobile: "$mobile",
              vehicle: "$vehicle",
            },
            doc: { $first: "$$ROOT" },
          },
        },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { createdAt: -1 } },
      ]);
    }

    return res.status(200).send({ status: true, data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//==========================================================================

const duplicateGeneral = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const repeatedPhoneNumbers = await generalModel.aggregate([
        {
          $group: {
            _id: {
              date: "$date",
              mobile: "$phone",

            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id from the result
  
            number: "$_id.mobile",
            date: "$_id.date",

            count: 1,
          },
        },
        { $match: { count: { $gt: 1 } } },
      ]);
  
      return res.status(200).send({ status: true, data: repeatedPhoneNumbers });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  
  //=================================================================
  const generalUniqueEntries = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      let data = await generalModel.aggregate([
        { $match: { isDeleted: false } },
        {
          $group: {
            _id: {
              date: "$date",
              mobile: "$phone",
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
  //===========================================================================
  
  const generalRange = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const { startDate, endDate } = req.body; // Assuming startDate and endDate are provided in the request body
  
      let data = await generalModel.aggregate([
        {
          $match: {
            isDeleted: false,
            $expr: {
              $and: [
                { $gte: ["$date", startDate] },
                { $lte: ["$date", endDate] },
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              date: "$date",
              mobile: "$phone",
            },
            doc: { $first: "$$ROOT" },
          },
        },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { createdAt: -1 } }, // Note: createdAt field doesn't seem to be in the pipeline
      ]);
  
      return res.status(200).send({ status: true, data: data });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  //====================================================================================
  
module.exports = {general, getGenerals,duplicateGeneral, generalUniqueEntries, generalRange}