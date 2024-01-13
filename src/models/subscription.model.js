import { Schema, model } from "mongoose";

const subscriptionSchema = Schema(
  {
    subscriber: { type: Schema.Types.ObjectId, ref: "User", required: true },
    channel: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Subscription = model("Subscription", subscriptionSchema);
export { Subscription };
