const offerModel = require("../model/offerModel")

const moment = require("moment");
require("moment-timezone");
const offers = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;

    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("YYYY-MM-DD");
    let times = moment().format("HH:mm:ss");
    data.date = dates;
    data.time = times;
    let savedata = await offerModel.create(data);
    res.status(201).send({ status: true, data: savedata });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
//==========================================================================


const getOffers = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const filter = req.query;
      const sortOptions = {};
      let data = [];
  
      if (Object.keys(filter).length === 0) {
        // No query parameters provided
        sortOptions.createdAt = -1;
        const data = await offerModel
          .find({ isDeleted: false })
          .sort(sortOptions);
        return res.status(200).send({ status: true, data: data });
      } else {
        const filterDate = filter.date;
  
        data = await offerModel.aggregate([
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
  //======================================================================

const duplicateOffers = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const repeatedPhoneNumbers = await offerModel.aggregate([
        {
          $group: {
            _id: {
              date: "$date",
              mobile: "$phone",
              vehicle: "$model",
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id from the result
  
            number: "$_id.mobile",
            date: "$_id.date",
            vehicle: "$_id.vehicle",
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
  const offersUniqueEntries = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      let data = await offerModel.aggregate([
        { $match: { isDeleted: false } },
        {
          $group: {
            _id: {
              date: "$date",
              mobile: "$phone",
              vehicle: "$model",
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
  
  const offersRange = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const { startDate, endDate } = req.body; // Assuming startDate and endDate are provided in the request body
  
      let data = await offerModel .aggregate([
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
  

module.exports ={offers, getOffers,duplicateOffers, offersUniqueEntries, duplicateOffers, offersRange}