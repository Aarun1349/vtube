// import { Express } from "express";
import dotenv from 'dotenv';
import connectToDB from "./db/index.js";

dotenv.config({
    path:'/.env'
})
// const app = Express();

connectToDB();