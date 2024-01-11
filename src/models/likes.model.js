import { Schema, model } from "mongoose";

const likesSchema = Schema(
  {
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tweets: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
    content: { required: true, type: String },
  },

  { timestamp: true }
);

const Like = model("Like", likesSchema);
export { Like };
