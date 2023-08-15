const express = require("express");
const reviews = require("../../controllers/reviews-controller");
const { authenticate } = require("../../middlewares/index");

const router = express.Router();

//Get all reviews
router.get("/", reviews.getAllReviews);

//Get owner's review
router.get("/own", authenticate, reviews.getReview);

//Post owner's review
router.post("/own", authenticate, reviews.setReview);

//Update owner's review
router.patch("/own",authenticate, reviews.changeReview);

//Delete owner's review
router.delete("/own",authenticate, reviews.deleteReview);

module.exports = router;
