import mongoose, { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    tags: {
      type: String,
      enum: ["Urgent", "Important", "Personal"],
      required: [true, "A tag is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Task  || model("Task", taskSchema);
