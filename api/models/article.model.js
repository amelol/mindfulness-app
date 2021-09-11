const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("../models/comment.model");

const articleSchema = new Schema(
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
    content: {
      type: String,
      minLength: [100, "content should have at least 100 letters"],
      required: "you have to put article content",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    keyWords: {
      type: [String],
      default: [],
      required: "at least one key word is required",
    },
    type: {
      type: String,
      enum: ["Meditation", "Mindfulness", "Sleep", "Stress"],
      required: "type is required",
    },
    views: {
      type: Number,
      default: 0,
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

articleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
  justOne: false,
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
