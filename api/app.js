const createError = require("http-errors")
const express = require("express");

const app = express();

app.use((req, res, next) => next(createError(404, "Route not found")))

app.use((error, req, res, next) => {
  if (!error.status) {
    error = createError(500, error)
  }
  
  const data = {};
  data.message = error.message;
  res.status(error.status).json(data);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.info(`Application running at port ${port}`));