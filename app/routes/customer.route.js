const express = require("express");
const customer = require("../controllers/customerController");
const router = express.Router();

router
  .route("/")
  .get(customer.findAll)
  .post(customer.create)
  .delete(customer.deleteAll);

module.exports = router;
