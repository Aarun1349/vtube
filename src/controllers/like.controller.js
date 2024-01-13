import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Likes } from "../models/likes.model.js";

const toggleVideoLike = asyncHandlerPromiseVersion(async (req, res) => {
    const {videoId} = req.params;
});

const toggleCommentLike = asyncHandlerPromiseVersion(async (req, res) => {
    const {commentId} = req.params;
});

const toggleTweetLike = asyncHandlerPromiseVersion(async (req, res) => {
    const {tweetId} = req.params;
});

const getLikedVideos = asyncHandlerPromiseVersion(async (req, res) => {});

export { getLikedVideos, toggleCommentLike, toggleVideoLike, toggleTweetLike };
