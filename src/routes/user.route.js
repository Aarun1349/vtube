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
userRouter.route("/update").put(verifyJWT, updateUserDetails);
userRouter.route("/channel/:id").get(verifyJWT, getUserChannelProfile);
export default userRouter;
