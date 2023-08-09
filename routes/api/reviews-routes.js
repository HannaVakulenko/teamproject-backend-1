const express = require("express");
const reviews = require("../../controllers/reviews-controller");

const router = express.Router();

router.get("/", reviews.getAllReviews);

router.get("/own", reviews.getReview);

router.post("/own", reviews.setReview);

router.patch("/own", reviews.changeReview);

router.delete("/own", reviews.deleteReview);



module.exports = router;
