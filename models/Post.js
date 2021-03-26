const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
    content: {
      type: {},
      required: true,
      min: 10,
      max: 200000,
    },
    user: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
