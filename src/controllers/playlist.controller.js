import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Likes } from "../models/likes.model.js";

const createPlaylist = asyncHandlerPromiseVersion(async (req, res) => {
  const { videoId } = req.params;
});

const getUserPlaylists = asyncHandlerPromiseVersion(async (req, res) => {
  const { commentId } = req.params;
});

const getPlaylistById = asyncHandlerPromiseVersion(async (req, res) => {
  const { tweetId } = req.params;
});

const addVideoToPlaylist = asyncHandlerPromiseVersion(async (req, res) => {});
const removeVideoFromPlaylist = asyncHandlerPromiseVersion(
  async (req, res) => {}
);
const deletePlaylist = asyncHandlerPromiseVersion(async (req, res) => {});
const updatePlaylist = asyncHandlerPromiseVersion(async (req, res) => {});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
