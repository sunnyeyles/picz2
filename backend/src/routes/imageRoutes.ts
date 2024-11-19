import { Router, Request, Response } from "express";
// import { protect } from "../middlewares/auth";

const imageRouter = Router();

imageRouter.post("/image/newimage/");
imageRouter.get("/image/getallimages/");

export default imageRouter;
