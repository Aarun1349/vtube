import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comments.model.js";

const getVideoComments = asyncHandlerPromiseVersion(async (req, res) => {});

const addComment = asyncHandlerPromiseVersion(async (req, res) => {});

const updateComment = asyncHandlerPromiseVersion(async (req, res) => {});

const deleteComment = asyncHandlerPromiseVersion(async (req, res) => {});

export { getVideoComments, updateComment, deleteComment, addComment };
