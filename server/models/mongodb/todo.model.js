import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    creator: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
