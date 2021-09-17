const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Like = require("../models/like.model");

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
    },
    duration: {
      type: Number,
      required: "duration is required",
    },
    keyWords: {
      type: [String],
      default: [],
      required: "at least one key word is required",
    },
    type: {
      type: [String],
      default: [],
      required: "type is required",
    },
    views: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

meditationSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "meditation",
  justOne: false,
});


const Meditation = mongoose.model("Medidation", meditationSchema);
module.exports = Meditation;

