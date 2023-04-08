const router = require("express").Router();
const { login, register } = require("./auth.controller");
const service = require("./auth.service");
const { Verify } = require("./auth.controller");
// app.use("/auth", authRoute);

router.post("/login", login);
router.post("/register", register);
router.post("/verify", Verify);

module.exports = router;
