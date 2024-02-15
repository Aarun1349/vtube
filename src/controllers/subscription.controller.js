import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  asyncHandler,
  asyncHandlerPromiseVersion,
} from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandlerPromiseVersion(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const getChannel = await User.findById(channelId);
  if (!getChannel) {
    throw new ApiError(404, "Requested Channel is not found");
  }
  let subscribed = null;

  const isSubscribed = await Subscription.findOne({
    subscribed: userId,
  });
  if (!isSubscribed) {
    subscribed = await Subscription.create({
      subscriber: userId,
      channelId: getChannel._id,
    });
  } else {
    subscribed = await Subscription.deleteOne({
      subscriber: userId,
      channelId: getChannel._id,
    });
  }
  if (!subscribed) {
    throw new ApiError(400, "Can't subscribe this");
  }

  res.status(200).json(new ApiResponse(200, subscribed, "success"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const sunscribers = await Subscription.find({
    channelId: channelId,
  });
  if (!sunscribers) {
    throw new ApiError(400, "no Subscriber");
  }

  res.status(200).json(new ApiResponse(200, sunscribers, "success"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "please login first");
  }
  const subscriptions = await Subscription.find({
    userId: subscriberId,
  });
  if (!subscriptions) {
    throw new ApiError(400, "no Subscribed channels");
  }

  res.status(200).json(new ApiResponse(200, subscriptions, "success"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
