import express from "express";
import { getFunds } from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/getFunds", getFunds);

export default usersRouter;
