import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changeCurrentPassword,
  updateUserDetails,
  getUserChannelProfile,
  updateUserAvatar,
  updateUserCoverImage,
  getUserWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";
const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRouter.route("/login").get(loginUser);
//secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/user").get(verifyJWT, getCurrentUser);
userRouter.route("/password").put(verifyJWT, changeCurrentPassword);
userRouter.route("/update").patch(verifyJWT, updateUserDetails);
userRouter
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
userRouter
  .route("/cover-image")
  .patch(
    verifyJWT,
    upload.fields([{ name: "coverImage", maxCount: 1 }]),
    updateUserCoverImage
  );
userRouter.route("/c/:username").get(verifyJWT, getUserChannelProfile);
userRouter.route("/history").get(verifyJWT, getUserWatchHistory);
export default userRouter;
