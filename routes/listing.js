const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// Index Route....
router.get("/",  
wrapAsync(listingController.index));
 
 // New Route
 router.get("/new", 
 isLoggedIn, 
 listingController.renderNewForm)
 
// show Route
 router.get("/:id",  
 wrapAsync(listingController.showListing));

//create route
 router.post("/", isLoggedIn, 
 upload.single('listing[image]'),
validateListing,
wrapAsync(listingController.createListing));

//edit Route
router.get("/:id/edit",
isLoggedIn, isOwner, 
 wrapAsync(listingController.editListing));

//update Route
router.put("/:id",isLoggedIn, isOwner, 
upload.single('listing[image]'), 
validateListing,
 wrapAsync(listingController.updateListing));

//delete Route
router.delete("/:id", 
isLoggedIn, isOwner, 
wrapAsync(listingController.destroyListing));

module.exports = router;