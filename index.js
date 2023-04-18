import path from "path";
import express from "express";

import BaseRouter from "#routes/base.js";

const __dirname = path.dirname(".");
const app = express();
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");
app.use("/", BaseRouter);

app.listen(8080, () => console.log("\u001b[32m[INFO]\u001b[0m App started successfully...."));
