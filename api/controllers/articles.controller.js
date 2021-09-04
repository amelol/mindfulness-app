const Article = require("../models/article.model");

module.exports.list = (req, res, next) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(error => next(error));
}