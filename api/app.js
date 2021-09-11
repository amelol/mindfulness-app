const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
require("./config/db.config");

const app = express();
app.use(logger("dev"))
//Middlewares
app.use(express.json()); //le indicamos que formato queremos recibir

// Routes
const routes = require("./config/routes.config");
app.use("/api", routes);

// Error handling
app.use((req, res, next) => next(createError(404, "Route not found")))

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError){
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError && error.message.includes("_id")) {
    error = createError(404, "Resource not found");
  } else if (!error.status) {
    error = createError(500, error);
  }
  
  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors)
      .reduce((errors, key) => {
        errors[key] = error.errors[key].message;
        return errors
      }, {});
  }
  res.status(error.status).json(data);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.info(`Application running at port ${port}`));