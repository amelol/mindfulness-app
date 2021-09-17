const createError = require("http-errors");
const Meditation = require("../models/meditation.model");

module.exports.list = (req, res, next) => {
  const { search, tops } = req.query;
  let criterial = {};
  if (search) {
    criterial = {
      $or: [
        // { title: new RegExp(search, "i") },
        // { summary: new RegExp(search, "i") },
        // { keywords: new RegExp(search, "i") },
        { type: new RegExp(search, "i") },
      ],
    };
  }

  const sort = {};
  if (tops) {
    sort.views = -1;
  }

  Meditation.find(criterial)
    .sort(sort)
    .then((meditations) => res.json(meditations))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Meditation.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate("author")
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
  Meditation.deleteOne({ _id: req.meditation.id })
    .then(() => res.status(204).send())
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  Meditation.create(req.body)
    .then((meditation) => res.status(201).json(meditation))
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  const data = { title, summary, image, duration, keywords, type } = req.body;
  const meditation = req.meditation;
  Object.assign(meditation, data);
  meditation
    .save()
    .then((meditation) => res.json(meditation))
    .catch((error) => next(error));
};