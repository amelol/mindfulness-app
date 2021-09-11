const createError = require("http-errors");
const Article = require("../models/article.model");

module.exports.list = (req, res, next) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        next(createError(404, "Article not found"));
      } else {
        res.json(article);
      }
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Article.findByIdAndDelete(req.params.id)
    .then((article) => {
      if (!article) {
        next(createError(404, "Article not found"));
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  Article.create(req.body)
    .then((article) => res.status(201).json(article))
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  const data = { title, summary, content, keywords, type} = req.body;
  Article.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  })
    // aqui realmente tengo que poner new true si utilizo patch?
    .then((article) => {
      if (!article) {
        next(createError(404, "Article not found"))
      } else {
        res.json(article);
      }
    })
    .catch((error) => next(error));
};
