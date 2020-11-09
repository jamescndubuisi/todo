const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    deadline: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);
module.exports = Todo = mongoose.model("bonuses", TodoSchema);
