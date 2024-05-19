import express from "express";
import LoadStockData from "../controllers/stocks.controller.js";

const stocksRouter = express.Router();

stocksRouter.post("/loadData", LoadStockData);

export default stocksRouter;
