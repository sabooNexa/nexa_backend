const express = require("express");
let router = express.Router();
const {
  popup,
  getPopups,
  dupilicatepopups,
  popupRangeEntries,
  popupUniqueEntries,
} = require("../controller/popupController");

const {
  onRoadPrice,
  getOnRoadPrice,
  duplicateOnRoadPrice,

  onRoadPriceUniqueEntries,
  onRoadPriceRange,
} = require("../controller/onRoadPriceController");

const {
  service,
  getService,
  dupeService,
  serviceUniqueEntries,
  serviceRangeData,
} = require("../controller/serviceController");

const {
  accessories,
  getAccessories,
  dupeAccessories,
  accessoriesUniqueEntries,
  accessoriesRangeData,
} = require("../controller/AccessoriesController");

const {
  isurance,
  getinsurance,
  dupeInsurance,
  insuranceUniqueEntries,
  insuranceRangeData,
} = require("../controller/insuranceController");

const {
  finance,
  dupeFinance,
  getFinance,
  financeUniqueEntries,
  financeRangeData,
} = require("../controller/financeController");

const {
  corporate,
  getCorporate,
  dupeCorporate,
  corporateUniqueEntries,
  corporateRangeData,
} = require("../controller/corporateController");

const {register , login}= require("../controller/userController")
const {
    allData,
    findUniqueEntriesInAllCollections,
    findDuplicatesInAllCollections,
    findDataInRangeInAllCollections,
  } = require("../controller/allDataController")

  const  {
    contactform,
    getcontactform,
  contactUsRange,
  contactUsUniqueEntries,
    dupesContactUs,
  } = require("../controller/contactUsController")


  const {authentication} = require("../middleware/auth")

  const {offers, getOffers, offersUniqueEntries, duplicateOffers, offersRange} = require('../controller/offerController')
  const {general, getGenerals} = require('../controller/generalController')
  let {
    drvingSchool,
    getDrivingSchool,
    dupesDrivingSchool,
    drivingSchoolUniqueEntries,
    drivingSchoolRange,
  } = require("../controller/drivingSchoolController");
//======================================================================
router.get("/test-me", function (req, res) {
  res.send("this is successfully created");
});
//=======================================================================
router.post("/register", register);
router.post("/login", login);

//=======================================================================
router.post("/popup", popup);
router.get("/getPopups", getPopups);
router.get("/dupilicatepopups", dupilicatepopups);
router.get("/popupUniqueEntries", popupUniqueEntries);
router.post("/popupRangeEntries", popupRangeEntries);
//========================================================================
router.post("/onRoadPrice", onRoadPrice);
router.get("/getOnRoadPrice", getOnRoadPrice);
router.get("/duplicateOnRoadPrice", duplicateOnRoadPrice);
router.get("/onRoadPriceUniqueEntries", onRoadPriceUniqueEntries);
router.post("/onRoadPriceRange", onRoadPriceRange);
//=======================================================================
router.post("/service", service);
router.get("/getService", getService);
router.get("/dupeService", dupeService);
router.get("/serviceUniqueEntries", serviceUniqueEntries);
router.post("/serviceRangeData", serviceRangeData);
//======================================================================
router.post("/accessories", accessories);
router.get("/getAccessories", getAccessories);
router.get("/dupeAccessories", dupeAccessories);
router.get("/accessoriesUniqueEntries", accessoriesUniqueEntries);
router.post("/accessoriesRangeData", accessoriesRangeData);
//======================================================================
router.post("/isurance", isurance);
router.get("/getinsurance", getinsurance);
router.get("/dupeInsurance", dupeInsurance);
router.get("/insuranceUniqueEntries", insuranceUniqueEntries);
router.post("/insuranceRangeData", insuranceRangeData);
//=======================================================================
router.post("/finance", finance);
router.get("/getFinance", getFinance);
router.get("/dupeFinance", dupeFinance);
router.get("/financeUniqueEntries", financeUniqueEntries);
router.post("/financeRangeData", financeRangeData);
//=======================================================================
router.post("/corporate", corporate);
router.get("/getCorporate", getCorporate);
router.get("/dupeCorporate", dupeCorporate);
router.get("/corporateUniqueEntries", corporateUniqueEntries);
router.post('/corporateRangeData',corporateRangeData)
//======================================================================
router.get("/allData", allData);
router.get("/findDuplicatesInAllCollections", findDuplicatesInAllCollections);
router.get("/findUniqueEntriesInAllCollections",findUniqueEntriesInAllCollections);
router.post("/findDataInRangeInAllCollections",findDataInRangeInAllCollections )
//===========================================================================
router.post("/contactform",contactform);
router.get("/getcontactform",getcontactform)
router.get("/contactUsUniqueEntries",contactUsUniqueEntries)
router.get("/dupesContactUs",dupesContactUs)
router.post("/contactUsRange",contactUsRange)
//=============================================================================
router.post('/offers',offers)
router.get("/getOffers",getOffers)
router.get("/duplicateOffers",duplicateOffers)
//============================================================================
router.post("/general",general)
router.get("/getGenerals",getGenerals)
//============================================================================
router.post("/drvingSchool",drvingSchool)
router.get("/getDrivingSchool",getDrivingSchool)
module.exports = router;
