const express = require("express");
let router = express.Router();

const sendEmailController = require("../controller/sendEmail");

router.get("/send-email", sendEmailController.sendEmail);

module.exports = router;
