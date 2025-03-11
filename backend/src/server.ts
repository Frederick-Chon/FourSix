import express from "express";
import { prisma } from "./prisma/client";
import usersRouter from "./routes/users";

import dotenv from "dotenv"
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Register the users route
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
