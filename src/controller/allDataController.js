const corporateModel = require("../model/corporateModel");
const accessoriesModel = require("../model/accessoriesModel");
const financeModel = require("../model/financeModel");
const insuranceModel = require("../model/insuranceModel");
const onRoadPriceModel = require("../model/onRoadPriceModel");
const popupModel = require("../model/popupModel");
const serviceModel = require("../model/serviceModel");

const allData = async (req, res) => {
  try {
    // Use Promise.all to query data from multiple collections concurrently
    const data = await Promise.all([
      corporateModel.find().sort({ createdAt: -1 }).exec(),
      accessoriesModel.find().sort({ createdAt: -1 }).exec(),
      financeModel.find().sort({ createdAt: -1 }).exec(),
      insuranceModel.find().sort({ createdAt: -1 }).exec(),
      onRoadPriceModel.find().sort({ createdAt: -1 }).exec(),
      popupModel.find().sort({ createdAt: -1 }).exec(),
      serviceModel.find().sort({ createdAt: -1 }).exec(),
    ]);

    // Combine the results into a single array
    const combinedData = data.reduce((acc, curr) => acc.concat(curr), []);
    // Sort the combinedData by createdAt in descending order (-1)
    combinedData.sort((a, b) => b.createdAt - a.createdAt);

    // Return the combined data in the response
    return res.status(200).send({ status: true, data: combinedData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//===========================================================================

const findDuplicates = async (
  model,
  phoneField,
  dateField,
  leadFromField,
  includeVehicle = false
) => {
  try {
    const groupPipeline = [
      {
        $group: {
          _id: {
            number: `$${phoneField}`,
            date: `$${dateField}`,
            leadFrom: `$${leadFromField}`,
            vehicle: includeVehicle ? `$model` : null,
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          number: "$_id.number",
          date: "$_id.date",
          leadFrom: "$_id.leadFrom",
          vehicle: "$_id.vehicle",
          count: 1,
        },
      },
      { $match: { count: { $gt: 1 } } },
    ];
    const repeatedData = await model.aggregate(groupPipeline);
    return { status: true, data: repeatedData };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
// Define a function to find duplicates in all collections
// Define a function to find duplicates in all collections
const findDuplicatesInAllCollections = async (req, res) => {
  try {
    const duplicateData = [];

    // For each collection, specify the model, phone field, date field, and leadFrom field
    const collections = [
      {
        model: corporateModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: accessoriesModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: financeModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: insuranceModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: onRoadPriceModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
        includeVehicle: true,
      }, // Include vehicle field
      {
        model: popupModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: serviceModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
    ];
    for (const {
      model,
      phoneField,
      dateField,
      leadFromField,
      includeVehicle,
    } of collections) {
      const result = await findDuplicates(
        model,
        phoneField,
        dateField,
        leadFromField,
        includeVehicle
      );
      if (result.status) {
        duplicateData.push(...result.data);
      } else {
        return res.status(500).send({ status: false, message: result.message });
      }
    }
    duplicateData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return res.status(200).send({ status: true, data: duplicateData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//======================================================
const findUniqueEntries = async (
  model,
  phoneField,
  dateField,
  leadFromField,
  includeVehicle = false
) => {
  try {
    const uniqueEntries = await model.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            number: `$${phoneField}`,
            date: `$${dateField}`,
            leadFrom: `$${leadFromField}`,
            vehicle: includeVehicle ? `$model` : null,
          },
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $sort: { createdAt: -1 } },
    ]);
    return { status: true, data: uniqueEntries };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// Define a function to find unique entries in all collections
const findUniqueEntriesInAllCollections = async (req, res) => {
  try {
    const uniqueData = [];

    // For each collection, specify the model, phone field, date field, and leadFrom field
    const collections = [
      {
        model: corporateModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: accessoriesModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: financeModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: insuranceModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: onRoadPriceModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
        includeVehicle: true,
      }, // Include vehicle field
      {
        model: popupModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: serviceModel,
        phoneField: "Phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
    ];
    for (const {
      model,
      phoneField,
      dateField,
      leadFromField,
      includeVehicle,
    } of collections) {
      const result = await findUniqueEntries(
        model,
        phoneField,
        dateField,
        leadFromField,
        includeVehicle
      );
      if (result.status) {
        uniqueData.push(...result.data);
      } else {
        return res.status(500).send({ status: false, message: result.message });
      }
    }
    uniqueData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return res.status(200).send({ status: true, data: uniqueData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//==========================================================================
const findDataInRange = async (
  model,
  phoneField,
  dateField,
  leadFromField,
  startDate,
  endDate,
  includeVehicle = false
) => {
  try {
    const dataInRange = await model.aggregate([
      {
        $match: {
          isDeleted: false,
          $expr: {
            $and: [
              { $gte: [`$${dateField}`, startDate] },
              { $lte: [`$${dateField}`, endDate] },
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            date: `$${dateField}`,
            mobile: `$${phoneField}`,
            leadFrom: `$${leadFromField}`,
            vehicle: includeVehicle ? `$model` : null,
          },
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $sort: { createdAt: -1 } }, // Note: Assuming createdAt field is present
    ]);
    return { status: true, data: dataInRange };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// Define a function to find data within a date range in all collections
const findDataInRangeInAllCollections = async (req, res) => {
  try {
    const dataInRange = [];
    const { startDate, endDate } = req.body; // Assuming startDate and endDate are provided in the request body
    // For each collection, specify the model, phone field, date field, leadFrom field, and includeVehicle option
    const collections = [
      {
        model: corporateModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: accessoriesModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: financeModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: insuranceModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: onRoadPriceModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
        includeVehicle: true,
      },
      {
        model: popupModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: serviceModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
    ];
    for (const {
      model,
      phoneField,
      dateField,
      leadFromField,
      includeVehicle,
    } of collections) {
      const result = await findDataInRange(
        model,
        phoneField,
        dateField,
        leadFromField,
        startDate,
        endDate,
        includeVehicle
      );
      if (result.status) {
        dataInRange.push(...result.data);
      } else {
        return res.status(500).send({ status: false, message: result.message });
      }
    }
    dataInRange.sort((a, b) => new Date(b.date) - new Date(a.date));
    return res.status(200).send({ status: true, data: dataInRange });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = {
  allData,
  findUniqueEntriesInAllCollections,
  findDuplicatesInAllCollections,
  findDataInRangeInAllCollections,
};
