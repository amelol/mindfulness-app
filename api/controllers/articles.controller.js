const createError = require("http-errors");
const Article = require("../models/article.model");

module.exports.list = (req, res, next) => {
  const { search } = req.query;
  let criterial = {};
  if (search) {
    criterial = {
      $or: [
        { title: new RegExp(search, "i") },
        { summary: new RegExp(search, "i") },
        { keywords: new RegExp(search, "i") },
      ],
    };
  }
  Article.find(criterial)
    .then((articles) => res.json(articles))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, { $inc: { views: 1 }}, { new: true})
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
  Article.deleteOne({ _id: req.article.id })
    .then(() => res.status(204).send())
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  Article.create(req.body)
    .then((article) => res.status(201).json(article))
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  const data = { title, summary, content, keywords, type} = req.body;
  const article = req.article;
  Object.assign(article, data);
  article
    .save()
    .then((article) => res.json(article))
    .catch((error) => next(error))
};
