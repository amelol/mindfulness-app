const createError = require("http-errors");
const Article = require("../models/article.model");

module.exports.exists = (req, res, next) => {
  const id = req.params.articleId || req.params.id;
  Article.findById(id)
    .then(article => {
      if(article) {
        req.article = article;
        next();
      } else {
        next(createError(404, "Article not found"))
      }
    })
    .catch(error => next(error))
};
