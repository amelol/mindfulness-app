const express = require("express");
const articles = require("../controllers/articles.controller");
const meditations = require("../controllers/meditations.controller");
const users = require("../controllers/users.controller");
const router = express.Router();


router.get("/");
router.get("/articles", articles.list);
router.get("/meditations", meditations.list);

router.get("/articles/:id", articles.detail);
router.get("/meditations/:id", meditations.detail);

router.patch("/articles/:id", articles.edit);
router.patch("/meditations/:id", meditations.edit);

router.delete("/articles/:id", articles.delete);
router.delete("/meditations/:id", meditations.delete);

router.post("/articles", articles.create);
router.post("/meditations", meditations.create);

router.get("/users", users.list);

module.exports = router;