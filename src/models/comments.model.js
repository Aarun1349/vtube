import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
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
commentSchema.plugin(mongooseAggregatePaginate);
const Comment = model("Comment", commentSchema);
export { Comment };
