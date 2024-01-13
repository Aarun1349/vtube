import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const getAllVideos = asyncHandlerPromiseVersion(async (req, res) => {
  const { page = 1, limit = 10, sortBy, query, sortType, userId } = req.query;
});

const publishAVideo = asyncHandlerPromiseVersion(async (req, res) => {
  const { title, description } = req.body;
});

const getVideoById = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
});

const updateVideo = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
});
const deleteVideo = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
});

const togglePublishStatus = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  getVideoById,
  updateVideo,
  publishAVideo,
  deleteVideo,
  togglePublishStatus,
};
