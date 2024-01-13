import { Schema, model } from "mongoose";

const tweetSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { required: true, type: String },
  },
  { timestamp: true }
);

const Tweet = model("Tweet", tweetSchema);
export { Tweet };
