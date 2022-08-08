import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    creator: String,
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    publicationDate: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
