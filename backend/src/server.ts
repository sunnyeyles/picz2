import express, { json } from "express";
import dotenv from "dotenv";
import { seedData } from "./utils/seedDB.js";
import cors from "cors";
import morgan from "morgan";
import { corsOptions } from "./config/corsOptions.js";
dotenv.config({ path: "../.env" });

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

export default app;
