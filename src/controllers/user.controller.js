import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
const registerUser = asyncHandlerPromiseVersion(async (req, res) => {
  //Step 1: get user details from frontend
  const { username, fullname, email, password } = req.body;
  console.log(username, fullname, email, password);
  //Step2: validation
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //Step3: if user already exist
  const existedUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(400, "user already existed");
  }

  //Step4: if image files exist or not and for avatar
  console.log("files", req.files.avatar[0].path);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;
  //   console.log(req)
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  //Step5: upload them to cloudinary,check avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverLocalPath);
  console.log("AVATAR", avatar, avatarLocalPath, coverImage, coverLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  //Step6: create entry in db
  const newUser = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
  });

  //Step7: check for user creation
  const user = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (user) {
    return res.status(201).json( new ApiResponse(200, user));
  } else {
    throw new ApiError(500, "Something went wrong");
  }
  //Step8: return responsee to user, except password and refresh token
});

export { registerUser };
