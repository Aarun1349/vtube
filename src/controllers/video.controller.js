import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const getAllVideos = asyncHandlerPromiseVersion(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const sortOrder = sortType === "desc" ? -1 : 1;
  //TODO: get all videos based on query, sort, pagination

  const videos = await Video.find()
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit);
  if (videos.length <= 0) {
    res.status(200).json(new ApiResponse(200, "No video found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, { count: videos.length, videos }, "success"));
});

const publishAVideo = asyncHandlerPromiseVersion(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video
  console.log(title, description);
  //Step 1: Validation
  if (
    [title, description].some((fields) => {
      fields?.trim() == "";
    })
  ) {
    return ApiError(400, "All fields are required");
  }

  //Step 2: Get User
  const userId = req.user.id;
  if (!userId) {
    return ApiError(400, "Please login first");
  }
  // Step 3:
  const videoFilePath = req.files?.videoFile[0]?.path;
  const thumbnailFilePath = req.files?.thumbnail[0]?.path;
  if (!videoFilePath || !thumbnailFilePath) {
    return ApiError(400, "Please provide the video file and thumbnail");
  }

  const videoFile = await uploadOnCloudinary(videoFilePath);
  const thumbnail = await uploadOnCloudinary(thumbnailFilePath);
  if (!videoFile || !thumbnail) {
    return ApiError(400, "Please provide the video file and thumbnail");
  }
  console.log("________", videoFile, thumbnail);
  const video = await Video.create({
    title,
    description,
    videoFile: videoFile?.url,
    thumbnail: thumbnail?.url,
    owner: userId,
    duration: videoFile?.duration,
  });
  const newVideo = await Video.findById(video._id);
  if (!newVideo) {
    return new ApiError(401, "Something went wrong. Video upload fail");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newVideo, "Video uploaded successfully"));
});

const getVideoById = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;

  //TODO: get video by id
  if (!videoId) {
    throw new ApiError(404, "requested video is not present");
  }
  const getVideo = await Video.findById({ _id: videoId });

  if (!getVideo) {
    throw new ApiError(404, "requested video is not present");
  }
  res.status(200).json(new ApiResponse(200, getVideo, "success"));
});

const updateVideo = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  //TODO: update video details like title, description, thumbnail
  if (!videoId) {
    throw new ApiError(404, "requested video is not present");
  }
  const getVideo = await Video.findById({ _id: videoId });
  if (!getVideo) {
    throw new ApiError(404, "requested video is not present");
  }
  const thumbnailFilePath = req.file?.path;
  if (!thumbnailFilePath) {
    throw new ApiError(404, "thumbnail file is not present");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailFilePath);
  if (!thumbnail) {
    throw new ApiError(404, "thumbnail file is not present");
  }
  const updateVideo = await Video.findByIdAndUpdate(
    { _id: videoId },
    { $set: { title, description, thumbnail: thumbnail.url } },
    { new: true }
  );
  if (!updateVideo) {
    throw new ApiError(404, "requested video is not present");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, updateVideo, "success: Video updated successfully")
    );
});

const deleteVideo = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  if (!videoId) {
    throw new ApiError(404, "requested video is not present");
  }
  const getVideo = await Video.findById({ _id: videoId });
  if (!getVideo) {
    throw new ApiError(404, "requested video is not present");
  }
  const deleteVideo = await Video.findByIdAndDelete({ _id: videoId });
  if (!deleteVideo) {
    throw new ApiError(404, "requested video is not present");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, deleteVideo, "success: Video deleted successfully")
    );
});

const togglePublishStatus = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(404, "requested video is not present");
  }
  const getVideo = await Video.findById({ _id: videoId });
  if (!getVideo) {
    throw new ApiError(404, "requested video is not present");
  }
  const changePublishStatus = await Video.findByIdAndUpdate(
    { _id: videoId },
    { $set: { isPublished: !getVideo.isPublished } },
    { new: true }
  );
  if (!changePublishStatus) {
    throw new ApiError(404, "requested video is not present");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        changePublishStatus,
        "success: Video published status is changed"
      )
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
