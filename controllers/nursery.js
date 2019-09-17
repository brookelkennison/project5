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

// =================  NEW PLANT
// router.patch('/userreviews/:companyid', (req,res) => {
// 	console.log("review route 2 (company id in params):", req.params.companyid);
// 	console.log("2.5 comments", req.body.comments);
// 	const newReview = {
// 		authorId: req.session.currentUser._id,
// 		rating: req.body.rating,
// 		comments: req.body.comments,
// 		date: req.body.date,
// 	}
// 	console.log("review route 3 (new review in route):", newReview);
// 	Townies.findByIdAndUpdate(req.params.companyid, {$push: {reviews:newReview}}, {new:true}, (err, updatedTownie) => {
// 		console.log("review route 4 (townie updated with review):", updatedTownie);
// 		res.json(updatedTownie)
// 	})
// })
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
