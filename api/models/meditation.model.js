const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Rating = require("../models/rating.model");

const meditationSchema = new Schema(
  {
    title: {
      type: String,
      required: "title is required",
      minLength: [3, "title should have at least 3 letters"],
    },
    summary: {
      type: String,
      minLength: [10, "summary should have at least 10 letters"],
      required: "you have to put summary",
    },
    audio: {
      type: String,
    },
    image: {
      type: String,
      default:
        "default-image.jpeg",
    },
    duration: {
      type: Number,
      required: "duration is required",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // keyWords: {
    //   type: [String],
    //   default: [],
    //   required: "at least one key word is required",
    // },
  },
  { timestamps: true }
);

// recipeSchema.virtual("ratings", {
//   ref: "Rating",
//   localField: "_id",
//   foreignField: "recipe",
//   justOne: false,
// });

//anadir virtual de valoraciones y calcular media

const Meditation = mongoose.model("Medidation", meditationSchema);
module.exports.Meditation = Meditation;

