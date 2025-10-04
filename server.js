import express from "express";
import homeRoute from "./routes/home.js";
import dotenv from "dotenv";
import hook from "./webhooks/webhook.js"
import { initPool } from "./database/pool.js";

dotenv.config();
await initPool()
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/", homeRoute);
app.use(hook);

app.listen(PORT);
console.log("http://localhost:3000");
