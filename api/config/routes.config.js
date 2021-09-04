const express = require("express");
const articles = require("../controllers/articles.controller");
const meditations = require("../controllers/meditations.controller");
const users = require("../controllers/users.controller");
const router = express.Router();


router.get("/");
router.get("/articles", articles.list);
router.get("/meditations", meditations.list);

module.exports = router;