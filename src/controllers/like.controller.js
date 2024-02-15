import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/likes.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  asyncHandler,
  asyncHandlerPromiseVersion,
} from "../utils/asyncHandler.js";
import { Comment } from "../models/comments.model.js";
import { Tweet } from "../models/tweets.model.js";

const toggleVideoLike = asyncHandlerPromiseVersion(async (req, res) => {
  //TODO: toggle like on video

  const { videoId } = req.params;
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const getVideoById = await Video.findById(videoId);
  if (!getVideoById) {
    throw new ApiError(404, "Requested video not found");
  }

  const toggleLike = await Like.create({
    video: videoId,
    likedBy: userId,
    isLiked: !isLiked,
  });

  if (!toggleLike) {
    throw new ApiError(400, "Can't like this");
  }

  res.status(200).json(new ApiResponse(200, toggleLike, "success"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  //TODO: toggle like on comment

  const { commentId } = req.params;

  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const getCommentsById = await Comment.findById(commentId);
  if (!getCommentsById) {
    throw new ApiError(404, "Requested comment not found");
  }

  const toggleLike = await Like.create({
    comment: commentId,
    likedBy: userId,
    isLiked: !isLiked,
  });

  if (!toggleLike) {
    throw new ApiError(400, "Can't like this");
  }

  res.status(200).json(new ApiResponse(200, toggleLike, "success"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  //TODO: toggle like on tweet
  const { tweetId } = req.params;

  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const getTweetById = await Tweet.findById(tweetId);
  if (!getTweetById) {
    throw new ApiError(404, "Requested tweet not found");
  }

  const toggleLike = await Like.create({
    tweet: tweetId,
    likedBy: userId,
    isLiked: !isLiked,
  });

  if (!toggleLike) {
    throw new ApiError(400, "Can't like this");
  }

  res.status(200).json(new ApiResponse(200, toggleLike, "success"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const getLikedVideoByUser = await await Like.find({
    likedBy: userId,
  });
  if (!getLikedVideoByUser) {
    throw new ApiError(404, "Requested comment not found");
  }

  res.status(200).json(new ApiResponse(200, getLikedVideoByUser, "success"));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
