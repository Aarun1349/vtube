import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweets.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";

const createTweet = asyncHandlerPromiseVersion(async (req, res) => {
  //TODO: create tweet
  const userId = req.user.id;
  const { content } = req.body;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  if (!content) {
    throw new ApiError(400, "tweet content is required");
  }

  const tweet = await Tweet.create({ owner: userId, content });

  if (!tweet) {
    throw new ApiError(400, "tweet is not posted");
  }

  res.status(200).json(new ApiResponse(200, tweet, "success"));
});

const getUserTweets = asyncHandlerPromiseVersion(async (req, res) => {
  // TODO: get user tweets
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  //   const { tweetId } = req.params;
  //   if (!tweetId) {
  //     throw new ApiError(404, "tweet not found");
  //   }
  const tweets = await Tweet.find({ owner: userId });
  if (tweets.length <= 0) {
    if (!tweetId) {
      throw new ApiError(404, "tweets not found");
    }
  }
  res
    .status(200)
    .json(new ApiResponse(200, { count: tweets.length, tweets }, "success"));
});

const updateTweet = asyncHandlerPromiseVersion(async (req, res) => {
  //TODO: update tweet
  const userId = req.user.id;
  const { tweetId } = req.params;
  const { content } = req.body;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }

  if (!content) {
    throw new ApiError(400, "tweet is required");
  }
  if (!tweetId) {
    throw new ApiError(400, "tweet not found");
  }
  const tweet = await Tweet.findByIdAndUpdate(
    { _id: tweetId },
    { $set: { content } },
    { new: true }
  );
  if (!tweet) {
    throw new ApiError(400, "tweets not updated successfully");
  }
  res
    .status(200)
    .json(new ApiResponse(200, tweet, "success: tweet updated successfully"));
});

const deleteTweet = asyncHandlerPromiseVersion(async (req, res) => {
  //TODO: delete tweet
  const userId = req.user.id;
  const { tweetId } = req.params;

  if (!userId) {
    throw new ApiError(400, "please login first");
  }

  if (!tweetId) {
    throw new ApiError(400, "tweet not found");
  }
  const tweet = await Tweet.findByIdAndDelete({ _id: tweetId });
  if (!tweet) {
    throw new ApiError(400, "Deletion failed: tweets not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, tweet, "success: tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
