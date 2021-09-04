const mongoose = require("mongoose");
const Article = require("../models/article.model");
const Meditation = require("../models/meditation.model");

require("../config/db.config");

mongoose.connection.once("open", () => {
  console.info(
    `Connected to the database ${mongoose.connection.db.databaseName}`
  );
  mongoose.connection
    .dropDatabase()
    .then(() => console.info("Database dropped"))
    .then(() => Article.create(articles))
    .then((articles) =>
      console.info(`Successfully created ${articles.length} articles`)
    )

    .then(() => Meditation.create(meditations))
    .then((meditations) =>
      console.info(`Successfully created ${meditations.length} meditations`)
    )
    .catch((error) => console.error("An error ocurred running seeds", error))
    .then(() => mongoose.disconnect());
});