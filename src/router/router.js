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
    nexaStatistics
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
  const {general, getGenerals, duplicateGeneral , generalUniqueEntries,generalRange } = require('../controller/generalController')
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
router.get("/getPopups",authentication, getPopups);
router.get("/dupilicatepopups",authentication, dupilicatepopups);
router.get("/popupUniqueEntries", authentication,popupUniqueEntries);
router.post("/popupRangeEntries",authentication, popupRangeEntries);
//========================================================================
router.post("/onRoadPrice", onRoadPrice);
router.get("/getOnRoadPrice", authentication, getOnRoadPrice);
router.get("/duplicateOnRoadPrice",authentication, duplicateOnRoadPrice);
router.get("/onRoadPriceUniqueEntries", authentication,onRoadPriceUniqueEntries);
router.post("/onRoadPriceRange",authentication, onRoadPriceRange);
//=======================================================================
router.post("/service", service);
router.get("/getService",authentication, getService);
router.get("/dupeService", authentication, dupeService);
router.get("/serviceUniqueEntries",authentication,  serviceUniqueEntries);
router.post("/serviceRangeData",authentication,  serviceRangeData);
//======================================================================
router.post("/accessories", accessories);
router.get("/getAccessories",authentication,  getAccessories);
router.get("/dupeAccessories", authentication, dupeAccessories);
router.get("/accessoriesUniqueEntries",authentication,  accessoriesUniqueEntries);
router.post("/accessoriesRangeData",authentication,  accessoriesRangeData);
//======================================================================
router.post("/isurance", isurance);
router.get("/getinsurance", authentication, getinsurance);
router.get("/dupeInsurance",authentication,  dupeInsurance);
router.get("/insuranceUniqueEntries", authentication, insuranceUniqueEntries);
router.post("/insuranceRangeData",authentication,  insuranceRangeData);
//=======================================================================
router.post("/finance", finance);
router.get("/getFinance",authentication,  getFinance);
router.get("/dupeFinance",authentication,  dupeFinance);
router.get("/financeUniqueEntries",authentication,  financeUniqueEntries);
router.post("/financeRangeData",authentication,  financeRangeData);
//=======================================================================
router.post("/corporate", corporate);
router.get("/getCorporate",authentication,  getCorporate);
router.get("/dupeCorporate",authentication,  dupeCorporate);
router.get("/corporateUniqueEntries",authentication,  corporateUniqueEntries);
router.post('/corporateRangeData',authentication, corporateRangeData)
//======================================================================
router.get("/allData", allData);
router.get("/findDuplicatesInAllCollections",authentication,  findDuplicatesInAllCollections);
router.get("/findUniqueEntriesInAllCollections",authentication, findUniqueEntriesInAllCollections);
router.post("/findDataInRangeInAllCollections",authentication,  findDataInRangeInAllCollections )
router.get("/nexaStatistics",nexaStatistics)
//===========================================================================
router.post("/contactform",contactform);
router.get("/getcontactform",authentication,  getcontactform)
router.get("/contactUsUniqueEntries",authentication,  contactUsUniqueEntries)
router.get("/dupesContactUs",authentication, dupesContactUs)
router.post("/contactUsRange",authentication, contactUsRange)
//=============================================================================
router.post('/offers',offers)
router.get("/getOffers",authentication,getOffers)
router.get("/duplicateOffers",authentication,duplicateOffers)
router.get("/offersUniqueEntries",authentication,offersUniqueEntries)
router.post("/offersRange",authentication,offersRange)
//============================================================================
router.post("/general",general)
router.get("/getGenerals",authentication,getGenerals)
router.get("/duplicateGeneral",authentication,duplicateGeneral)
router.get("/generalUniqueEntries",authentication,generalUniqueEntries)
router.post("/generalRange",authentication,generalRange )
//============================================================================
router.post("/drvingSchool",drvingSchool)
router.get("/getDrivingSchool",authentication,getDrivingSchool)
router.get("/dupesDrivingSchool",authentication,dupesDrivingSchool)
router.get("/drivingSchoolUniqueEntries",authentication,drivingSchoolUniqueEntries)
router.post("/drivingSchoolRange",authentication,drivingSchoolRange)
module.exports = router;
