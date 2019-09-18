const express = require("express");
const router = express.Router();
const Plants = require("../models/plants.js");

// =========================
//                MIDDLEWARE
// =========================

// =================  CREATE
router.post("/", (req,res) => {
	Plants.create(req.body, (error, createdPlant) => {
    res.json(createdPlant);
  });
});

// =================  INDEX
router.get("/", (req, res) => {
	Plants.find({}, (error, allPlants) => {
		res.json(allPlants)
  });
});


// =================  SHOW
router.get("/:id", (req, res) => {
  Plants.findById(req.params.id, (error, showplant) => {
    res.json(showplant);
});
});

// =================  UPDATE
router.put("/:id", (req, res) => {
	console.log("Edit Route 2 (id in route of plant to edit):", req.params.id);
	Plants.findByIdAndUpdate(req.params.id, req.body, (error, updatedPlant) => {
		res.json(updatedPlant)
  });
});

// =================  DELETE
router.delete("/:id", (req, res) => {
	Plants.findByIdAndRemove(req.params.id, (deletedPlant) => {
		res.json(deletedPlant);
  });
});

module.exports = router;
