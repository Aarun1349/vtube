import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

//Middlewares

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json({limit:"16kb"}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

export { app };
