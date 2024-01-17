import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

//Middlewares

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes imports
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import videoRouter from "./routes/video.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import likesRouter from "./routes/likes.route.js";
import tweetRouter from "./routes/tweet.route.js";
import playListRouter from "./routes/playlist.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import healthcheckRouter from "./routes/healthCheck.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/like", likesRouter);
app.use("/api/v1/playlist", playListRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/heathcheck", healthcheckRouter);

export { app };
