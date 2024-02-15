import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/likes.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const channelId = req.body.channelId;
  const userId = req.user.id;
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new ApiError(404, "Please login first");
  }
  const totalViews = await Video.aggregate(
    {
      $match: {
        owner: channelId,
      },
    },
    {
      $groupBy: {
        _id: null,
        totalViews: { $sum: "$views" },
      },
    }
  );

  const totalSubscribers = await Subscription.aggregate(
    {
      $match: {
        channel: channelId,
      },
    },
    {
      $groupBy: {
        _id: null,
        totalViews: { $sum: "$views" },
      },
    }
  );
  const totalVideos = await Video.countDocuments({ owner: channelId });

  // const totalLikes = await Like.aggregate({$match:{
  //   video:channelId
  // }},{
  //   $groupBy:{
  //     _id:null,totalLikes:{$sum:"$isLiked"}
  //   }
  // })
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalVideos, totalSubscribers, totalViews },
        "success"
      )
    );

  // const totalLikes = await Like.countDocuments({video:videoId} && {isLiked:true})
  // const totalViews = await Video.countDocuments({_id:videoId});
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const channelId = req.body.channelId;
  const userId = req.user.id;
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new ApiError(404, "Please login first");
  }
  const getAllVideos = await Video.find({
    owner: channelId,
  });

  if (!getAllVideos) {
    throw new ApiError(404, "No Video Found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { count: getAllVideos.length, getAllVideos },
        "success"
      )
    );
});

export { getChannelStats, getChannelVideos };
