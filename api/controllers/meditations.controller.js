const Meditation = require("../models/meditation.model");

module.exports.list = (req, res, next) => {
  Meditation.find()
    .then((meditations) => res.json(meditations))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  res.json(req.meditation);
};
