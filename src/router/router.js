const express = require("express");
let router = express.Router();
const {
    popup,
    getPopups,
    dupilicatepopups,
    popupRangeEntries,
    popupUniqueEntries,
  } = require("../controller/popupController");

  const  {
    onRoadPrice,
    getOnRoadPrice,
    duplicateOnRoadPrice,
  
    onRoadPriceUniqueEntries,
    onRoadPriceRange,
  }= require("../controller/onRoadPriceController")
//======================================================================
router.get("/test-me", function (req, res) {
    res.send("this is successfully created");
  });

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

module.exports = router;