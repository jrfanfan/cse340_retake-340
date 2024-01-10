// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:classificationId2", invController.buildByClassificationDetail);

router.get("/site-name/inv/", invController.buildByManagement);

router.get("/addNewClassification", invController.buildByAddNewClassification);

module.exports = router;