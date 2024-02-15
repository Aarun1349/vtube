import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlists.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler, asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandlerPromiseVersion(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const createPlaylist = await Playlist.create({
    name,
    description,
    owner: userId,
  });
  if (!createPlaylist) {
    throw new ApiError(400, "Playlist is not created");
  }

  res.status(200).json(new ApiResponse(200, createPlaylist, "success"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  // const {userId} = req.params
  //TODO: get user playlists
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const getPlaylists = await Playlist.find({
    owner: userId,
  });
  if (!getPlaylists) {
    throw new ApiError(404, "no playlist found");
  }
  res.status(200).json(new ApiResponse(200, getPlaylists, "success"));
});

const getPlaylistById = asyncHandlerPromiseVersion(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const getPlaylist = await Playlist.findById({
    _id: playlistId,
  });
  if (!getPlaylist) {
    throw new ApiError(404, "no playlist found");
  }
  res.status(200).json(new ApiResponse(200, getPlaylist, "success"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const addVideo = await Playlist.updateOne(
    {
      _id: playlistId,
    },
    {
      $push: {
        videos: videoId,
      },
    }
  );
  if (!addVideo) {
    throw new ApiError(404, "no video added");
  }
  res.status(200).json(new ApiResponse(200, addVideo, "success"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const removeVideo = await Playlist.updateOne(
    {
      _id: playlistId,
    },
    {
      $pop: {
        videos: videoId,
      },
    }
  );
  if (!removeVideo) {
    throw new ApiError(404, "no video added");
  }
  res.status(200).json(new ApiResponse(200, removeVideo, "success"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const getPlaylist = await Playlist.findById({
    _id: playlistId,
  });
  if (!getPlaylist) {
    throw new ApiError(404, "no playlist found");
  }
  const deleteList = await Playlist.deleteOne({
    _id: playlistId,
  });
  res.status(200).json(new ApiResponse(200, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const updatePlaylist = await Playlist.findAndUpdate(
    { _id: playlistId },
    {
      $set: {
        name,
        description,
      },
    }
  );
  if (!updatePlaylist) {
    throw new ApiError(404, "no video added");
  }
  res.status(200).json(new ApiResponse(200, updatePlaylist, "success"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
