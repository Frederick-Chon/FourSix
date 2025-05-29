import express, { Request, Response } from "express";
import { prisma } from "../prisma/client";

const brewsRouter = express.Router();

// GET /brews - Fetch all brews with coffee bean info
brewsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const brews = await prisma.brewHistory.findMany({
      include: { coffeeBean: true },
    });
    res.status(200).json({ success: true, data: brews });
  } catch (error) {
    console.error("GET /brews failed:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /brews - Create a new brew
brewsRouter.post("/", async (req: Request, res: Response) => {
  const {
    userId,
    brewSize,
    balance,
    strength,
    coffeeAmount,
    waterAmount,
    pours,
    coffeeBeanId,
    notes,
    grindSize,
    tasteRating,
  } = req.body;

  if (
    !userId ||
    !brewSize ||
    !balance ||
    !strength ||
    typeof coffeeAmount !== "number" ||
    typeof waterAmount !== "number" ||
    !pours
  ) {
    res.status(400).json({ success: false, error: "Missing required fields" });
    return;
  }

  try {
    console.log('Payload for brew:', {
      userId,
      brewSize,
      balance,
      strength,
      coffeeAmount,
      waterAmount,
      pours,
      coffeeBeanId,
      notes,
      grindSize,
      tasteRating,
    });
    const newBrew = await prisma.brewHistory.create({
      data: {
        userId,
        brewSize,
        balance,
        strength,
        coffeeAmount,
        waterAmount,
        pours,
        ...(coffeeBeanId && { coffeeBeanId }),
        notes,
        grindSize,
        tasteRating,
      },
    });

    res.status(201).json({ success: true, data: newBrew });
  } catch (error) {
    console.error("POST /brews failed:", error);
    res.status(500).json({ success: false, error: "Failed to create brew" });
  }
});

// PUT /brews/:id - Update a brew
brewsRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    brewSize,
    balance,
    strength,
    coffeeAmount,
    waterAmount,
    pours,
    coffeeBeanId,
    notes,
    grindSize,
    tasteRating,
  } = req.body;

  try {
    const updatedBrew = await prisma.brewHistory.update({
      where: { id },
      data: {
        brewSize,
        balance,
        strength,
        coffeeAmount,
        waterAmount,
        pours,
        coffeeBeanId,
        notes,
        grindSize,
        tasteRating,
      },
    });

    res.status(200).json({ success: true, data: updatedBrew });
  } catch (error) {
    console.error(`PUT /brews/${id} failed:`, error);
    res.status(500).json({ success: false, error: "Failed to update brew" });
  }
});

// DELETE /brews/:id - Delete a brew
brewsRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.brewHistory.delete({ where: { id } });
    res.status(200).json({ success: true, message: "Brew deleted successfully" });
  } catch (error) {
    console.error(`DELETE /brews/${id} failed:`, error);
    res.status(500).json({ success: false, error: "Failed to delete brew" });
  }
});

export default brewsRouter;
