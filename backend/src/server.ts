import express from "express";
import { prisma } from "./prisma/client";
import usersRouter from "./routes/users";
import brewsRouter from "./routes/brews";
import coffeeRouter from "./routes/coffee";

import dotenv from "dotenv"
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Register routes
app.use('/users', usersRouter);
app.use('/brews', brewsRouter);
app.use('/coffee', coffeeRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
