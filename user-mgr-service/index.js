import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.route.js";

const app = express();
dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 8086;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("User manager service");
});

//Routes
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`User manager service is running on http://localhost:${PORT}`);
});
