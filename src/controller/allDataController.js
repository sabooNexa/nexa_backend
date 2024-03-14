const corporateModel = require("../model/corporateModel");
const accessoriesModel = require("../model/accessoriesModel");
const financeModel = require("../model/financeModel");
const insuranceModel = require("../model/insuranceModel");
const onRoadPriceModel = require("../model/onRoadPriceModel");
const popupModel = require("../model/popupModel");
const serviceModel = require("../model/serviceModel");
const contactusModel =require("../model/contactUsModel")
const offerModel = require("../model/offerModel")
const generalModel = require("../model/generalModel")
const drivingSchoolModel = require("../model/drivingSchoolModel")


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
      contactusModel.find().sort({ createdAt: -1 }).exec(),
      offerModel.find().sort({ createdAt: -1 }).exec(),
      generalModel.find().sort({ createdAt: -1 }).exec(),
      drivingSchoolModel.find().sort({ createdAt: -1 }).exec()
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
      {
        model: contactusModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: offerModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: generalModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: drivingSchoolModel,
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
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: contactusModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: offerModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: generalModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: drivingSchoolModel,
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
      {
        model: contactusModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: offerModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: generalModel,
        phoneField: "phone",
        dateField: "date",
        leadFromField: "leadFrom",
      },
      {
        model: drivingSchoolModel,
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



const nexaStatistics = async (req, res) => {
  try {
    const data = await Promise.all([
      corporateModel.find().sort({ createdAt: -1 }).exec(),
      accessoriesModel.find().sort({ createdAt: -1 }).exec(),
      financeModel.find().sort({ createdAt: -1 }).exec(),
      insuranceModel.find().sort({ createdAt: -1 }).exec(),
      onRoadPriceModel.find().sort({ createdAt: -1 }).exec(),
      popupModel.find().sort({ createdAt: -1 }).exec(),
      serviceModel.find().sort({ createdAt: -1 }).exec(),
      contactusModel.find().sort({ createdAt: -1 }).exec(),
      offerModel.find().sort({ createdAt: -1 }).exec(),
      generalModel.find().sort({ createdAt: -1 }).exec(),
      drivingSchoolModel.find().sort({ createdAt: -1 }).exec()
    ]);

 // Combine the results into a single array
 const combinedData = data.reduce((acc, curr) => acc.concat(curr), []);

 // Extract leadFrom values from the combined data
 const leadFromValues = combinedData.map(item => item.leadFrom);
// console.log(leadFromValues.length)
 let hm = new Map()
 for(let i=0;i<leadFromValues.length;i++){
  if(hm.has(leadFromValues[i])){
    let val = hm.get(leadFromValues[i])
    hm.set(leadFromValues[i], val+1)
    // hm.set("allData", val+1)
  }else{
    hm.set(leadFromValues[i],1)
  }
 }
 hm.set("AllData", leadFromValues.length)
//  console.log(hm)
 const formData = {};
 hm.forEach((value, key) => {
  formData[key] = value;
 });

   // Helper function to convert month number to name
   const monthNumberToName = (monthNumber) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[monthNumber - 1];
  };

  // Initialize a Map to store the counts of each month and year
  let monthYearCounts = new Map();

  // Iterate over combinedData to extract month and year and count occurrences
  combinedData.forEach(item => {
    const date = new Date(item.createdAt);
    const monthName = monthNumberToName(date.getMonth() + 1); // Convert month number to name
    const year = date.getFullYear();
    const monthYear = `${monthName}${year}`; // Format as MMMYYYY

    if (monthYearCounts.has(monthYear)) {
      monthYearCounts.set(monthYear, monthYearCounts.get(monthYear) + 1);
    } else {
      monthYearCounts.set(monthYear, 1);
    }
  });

  // Convert the Map to an object for easier handling
  const monthYearCountsArray = Array.from(monthYearCounts, ([x, y]) => ({ x, y }));

      // Sort the array by month and year in ascending order
      monthYearCountsArray.sort((a, b) => {
        const dateA = new Date(`${a.x.slice(3)}-${a.x.slice(0, 3)}-01`);
        const dateB = new Date(`${b.x.slice(3)}-${b.x.slice(0, 3)}-01`);
        return dateA - dateB;
      });
  
      let leadFromMonthYearCounts = new Map();

    // Iterate over combinedData to extract month and year and count occurrences for each leadFrom
    combinedData.forEach(item => {
      const date = new Date(item.createdAt);
      const monthName = monthNumberToName(date.getMonth() + 1); // Convert month number to name
      const year = date.getFullYear();
      const monthYear = `${monthName}${year}`; // Format as MMMYYYY
      const leadFrom = item.leadFrom;

      // Create a unique key for each leadFrom and monthYear combination
      const key = `${leadFrom}-${monthYear}`;

      if (leadFromMonthYearCounts.has(key)) {
        leadFromMonthYearCounts.set(key, leadFromMonthYearCounts.get(key) + 1);
      } else {
        leadFromMonthYearCounts.set(key, 1);
      }
    });

    // Convert the Map to an array of objects for easier handling
    const leadFromMonthYearCountsArray = Array.from(leadFromMonthYearCounts, ([key, count]) => {
      const [leadFrom, monthYear] = key.split('-');
      return { leadFrom, monthYear, count };
    });

    // Group the counts by month
    const groupedByMonth = leadFromMonthYearCountsArray.reduce((acc, { leadFrom, monthYear, count }) => {
      if (!acc[monthYear]) {
        acc[monthYear] = { Month: monthYear };
      }
      acc[monthYear][leadFrom] = count;
      return acc;
    }, {});

      // Assign a fixed color to each leadFrom value
      const assignColor = (leadFrom) => {
        // Example fixed color assignment
        const colors = {
          "Driving School": "hsl(0, 100%, 50%)", // Red
          Corporate: "hsl(240, 100%, 50%)", // Blue
          Accessories: "hsl(120, 100%, 50%)", // Green
          Finance: "hsl(300, 100%, 50%)", // Purple
          Insurance: "hsl(30, 100%, 50%)", // Orange
          "On Road Price": "hsl(60, 100%, 50%)", // Yellow
          PopUp: "hsl(330, 100%, 50%)", // Pink
          Service: "hsl(45, 100%, 50%)", // Brown
          "24/7 Service": "hsl(0, 0%, 50%)", // Black
          "Contact Us": "hsl(0, 0%, 100%)", // White
          offers: "hsl(180, 100%, 50%)", // Cyan
          Showroom: "hsl(300, 100%, 50%)", // Magenta
          "Test Drive": "hsl(120, 100%, 50%)", // Lime
         };
         
      
        return colors[leadFrom] || "hsl(0, 0%, 0%)"; // Default color if not found
      };
  
      for (const month in groupedByMonth) {
        for (const leadFrom in groupedByMonth[month]) {
          if (leadFrom !== "Month") {
            groupedByMonth[month][`${leadFrom}Color`] = assignColor(leadFrom);
          }
        }
      }
      let barchart = Object.values(groupedByMonth)
//  Return the leadFrom values in the response
 return res.status(200).send({ formData , monthYearCounts: monthYearCountsArray, barchart});
// return res.status(200).send(Object.values(groupedByMonth));
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}




module.exports = {
  allData,
  findUniqueEntriesInAllCollections,
  findDuplicatesInAllCollections,
  findDataInRangeInAllCollections,
  nexaStatistics
};
