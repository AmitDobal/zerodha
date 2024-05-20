import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/orders.route.js";

const app = express();
dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 8087;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Orders manager service");
});

//Routes
app.use("/orders", usersRouter);

app.listen(PORT, () => {
  console.log(`Orders manager service is running on http://localhost:${PORT}`);
});
