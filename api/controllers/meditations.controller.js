const Meditation = require("../models/meditation.model");

module.exports.list = (req, res, next) => {
  Meditation.find()
    .then((meditations) => res.json(meditations))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Meditation.findById(req.params.id)
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
    // aqui realmente tengo que poner new true si utilizo patch?
    .then((meditation) => {
      if (!meditation) {
        next(createError(404, "Meditation not found"));
      } else {
        res.json(meditation);
      }
    })
    .catch((error) => next(error));
};