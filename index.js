import path from "path";
import express from "express";
import { configManager } from "./utils/config.js";
import BaseRouter from "#routes/base.js";

const __dirname = path.dirname(".");
const app = express();
const isProd = process.env.NODE_ENV;


isProd !== "production" && app.use("/static", express.static("static"));
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");
app.use("/", BaseRouter);



app.listen(8000, () => console.log("\u001b[32m[INFO]\u001b[0m App started successfully on http://localhost:8000"));
