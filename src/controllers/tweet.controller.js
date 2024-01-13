import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweets } from "../models/tweets.model.js";

const createTweet = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
});

const updateTweet = asyncHandlerPromiseVersion(async (req, res) => {
  const { commentId } = req.params;
});

const deleteTweet = asyncHandlerPromiseVersion(async (req, res) => {
  const { tweetId } = req.params;
});

const getUSerTweet = asyncHandlerPromiseVersion(async (req, res) => {});

export { createTweet, updateTweet, deleteTweet, getUSerTweet };
