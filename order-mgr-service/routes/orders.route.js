import express from "express";
import {
  addOrder,
  cancelOrder,
  getOrders,
} from "../controllers/orders.controller.js";

const usersRouter = express.Router();

usersRouter.get("/get", getOrders);
usersRouter.post("/add", addOrder);
usersRouter.delete("/cancel", cancelOrder);

export default usersRouter;
