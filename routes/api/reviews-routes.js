const express = require("express");
const reviews = require("../../controllers/reviews-controller");
const { authenticate } = require("../../middlewares/index");

const router = express.Router();

router.get("/", reviews.getAllReviews);

router.get("/own", authenticate, reviews.getReview);

router.post("/own", authenticate, reviews.setReview);

router.patch("/own",authenticate, reviews.changeReview);

router.delete("/own",authenticate, reviews.deleteReview);

module.exports = router;
