const createError = require("http-errors");
const Meditation = require("../models/meditation.model");

module.exports.exists = (req, res, next) => {
  const id = req.params.meditationId || req.params.id;
   Meditation.findById(id)
     .then((meditation) => {
       if (meditation) {
        req.meditation = meditation;
        next();
       } else {
         next(createError(404, "Meditation not found"));
       }
     })
     .catch((error) => next(error));
};
