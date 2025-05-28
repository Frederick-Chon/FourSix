import express from "express";
import { prisma } from "./prisma/client";
import usersRouter from "./routes/users";
import brewsRouter from "./routes/brews";

import dotenv from "dotenv"
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Register routes
app.use('/users', usersRouter);
console.log('Type of brewsRouter before app.use:', typeof brewsRouter); // Should be 'function'
app.use('/brews', brewsRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
