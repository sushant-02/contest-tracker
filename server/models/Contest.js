const mongoose = require("mongoose");
const { Schema } = mongoose;

const contestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    ajinkya: {
      type: Boolean,
      default: false,
    },
    sushant: {
      type: Boolean,
      default: false,
    },
    postedBy: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contest", contestSchema);
