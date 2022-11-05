const express = require("express");
const contacts = require("../controllers/controller.js");
const router = express.Router();


router.route("/")
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.deleteAll);

router.route("/:id")
    .get(contacts.findOne)
    .post(contacts.update)
    .delete(contacts.delete);   

router.route("/favorite")
    .get(contacts.findAllFavorite);

module.exports = router;