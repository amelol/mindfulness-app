const createError = require("http-errors");
const Article = require("../models/article.model");

module.exports.list = (req, res, next) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((error) => next(error));
}

module.exports.detail = (req, res, next) => {
  Article.findById(req.params.id)
  .then(article => {
    if (!article) {
      next(createError(404, "Article not found"))
    } else {
      res.json(article);
    }
  })
  .catch(error => next(error))
};