import { Comment } from "../models/comments.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandlerPromiseVersion(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  if (!videoId) {
    throw new ApiError(404, "Requested video not found");
  }
  const comments = await Comment.find({ video: videoId })
    .limit(limit)
    .skip((page - 1) * limit);
  if (comments.length <= 0) {
    throw new ApiError(404, "No comment found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, { count: comments.length, comments }, "success")
    );
});

const addComment = asyncHandlerPromiseVersion(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const userId = req.user?.id;
  const { content } = req.body;
  if (!videoId) {
    throw new ApiError(404, "Requested video not found");
  }
  if (!userId) {
    throw new ApiError(404, "Please login first");
  }
  if (!content) {
    throw new ApiError(404, "Comment is requiredl");
  }

  const comment = await Comment.create({
    owner: userId,
    video: videoId,
    content,
  });
  if (!comment) {
    throw new ApiError(400, "Someting went wrong");
  }

  res.status(200).json(new ApiResponse(200, comment, "success"));
});

const updateComment = asyncHandlerPromiseVersion(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;
  const userId = req.user?.id;
  const { content } = req.body;
  if (!commentId) {
    throw new ApiError(404, "comment not found");
  }
  if (!userId) {
    throw new ApiError(404, "Please login first");
  }
  if (!content) {
    throw new ApiError(404, "Comment is requiredl");
  }

  const comment = await Comment.findByIdAndUpdate(
    { _id: commentId },
    { $set: { content } },
    { new: true }
  );
  if (!comment) {
    throw new ApiError(400, "Someting went wrong");
  }

  res
    .status(200)
    .json(new ApiResponse(200, comment, "comment updated successfully"));
});

const deleteComment = asyncHandlerPromiseVersion(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  const userId = req.user?.id;

  if (!commentId) {
    throw new ApiError(404, "comment not found");
  }
  if (!userId) {
    throw new ApiError(404, "Please login first");
  }

  const comment = await Comment.findByIdAndDelete({ _id: commentId });
  if (!comment) {
    throw new ApiError(400, "Someting went wrong");
  }

  res
    .status(200)
    .json(new ApiResponse(200, comment, "comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
