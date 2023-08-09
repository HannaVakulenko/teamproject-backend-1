const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// import of routes
const authRouter = require("./routes/api/auth-routes");
const reviewsRouter = require("./routes/api/reviews-routes");



const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// global middlewares:
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // if body content-type application/json, middleware create object in req.body
app.use(express.static("public")); // сonfigure Express to distribute static files from the public folder (http://localhost:3000/avatars/<file name with extension>)

// routes app.use():
app.use("./api/auth", authRouter);
app.use("./api/reviews", reviewsRouter);

// other middlewares
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
