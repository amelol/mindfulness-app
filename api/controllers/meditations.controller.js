const createError = require("http-errors");
const Meditation = require("../models/meditation.model");

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
  Meditation.find(criterial)
    .then((meditations) => res.json(meditations))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Meditation.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  )
    .then((meditation) => {
      if (!meditation) {
        next(createError(404, "Meditation not found"));
      } else {
        res.json(meditation);
      }
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Meditation.findByIdAndDelete(req.params.id)
    .then((meditation) => {
      if (!meditation) {
        next(createError(404, "Meditation not found"));
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  Meditation.create(req.body)
    .then((meditation) => res.status(201).json(meditation))
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  const data = ({ title, summary, image, duration, keywords, type } = req.body);
  Meditation.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  })
    .then((meditation) => {
      if (!meditation) {
        next(createError(404, "Meditation not found"));
      } else {
        res.json(meditation);
      }
    })
    .catch((error) => next(error));
};
