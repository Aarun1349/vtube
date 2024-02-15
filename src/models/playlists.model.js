import { Schema, model } from "mongoose";

const playlistSchema = Schema(
  {
    name: { required: true, type: String },
    description: { required: true, type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videos: {
      type: [Schema.Types.ObjectId],
      ref: "Video",
      required: true,
    },
    
  },
  { timestamp: true }
);

const Playlist = model("Playlist", playlistSchema);
export { Playlist };
