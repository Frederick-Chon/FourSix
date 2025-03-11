import express from "express";
import { prisma } from "../prisma/client";

const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error!' })
  }
});

export default usersRouter;
