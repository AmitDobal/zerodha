import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import watchListRouter from "./routes/wathclists.route.js";
import connectToMongoDB from "./db/db.js";

dotenv.config({path : '.env.local'});
const app = express();
app.use(express.json());
const port = process.env.PORT || 8085;
app.use(cors());

app.use("/watchlists", watchListRouter);

app.get("/", async (req, res) => {
  res.json({ message: "HHLD Stock Broker Watchlist Manager Service" });
});

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Watchlist service is running at http://localhost:${port}`);
});
