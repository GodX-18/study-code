const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseModel = require("./base-model");

const articleSchema = new Schema(
  {
    ...baseModel,
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    tagList: {
      type: [String],
      default: null
    },
    favoritesCount: {
      type: Number,
      default: 0
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    strictPopulate: false,
  }
);

const articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;
