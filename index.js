const express = require("express");
require("dotenv").config();
const authRoute = require("./auth/auth.route");
const body_parser = require("body-parser");
const app = express();

app.use(express.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//Routing

app.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "rest api working",
  });
});

app.use("/auth", authRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server is running on Port :", process.env.APP_PORT);
});

module.exports = app;
