import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video: { required: true, type: Schema.Types.ObjectId, ref: "Video" },
    content: { required: true, type: String },
  },
  { timestamp: true }
);

const Comment = model("Comment", commentSchema);
export { Comment };
