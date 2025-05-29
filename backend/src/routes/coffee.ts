// src/routes/coffee.ts
import express, { Request, Response } from "express";
import { prisma } from "../prisma/client";

const coffeeRouter = express.Router();

// GET /coffee - Fetch all coffee beans
coffeeRouter.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const coffees = await prisma.coffeeInventory.findMany();
    res.status(200).json({ success: true, data: coffees });
  } catch (error) {
    console.error("GET /coffee failed:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch coffee beans" });
  }
});

// POST /coffee - Add a new coffee bean
coffeeRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  const { userId, name, roaster, origin, process, roastDate, totalWeight } =
    req.body;

  if (
    !userId ||
    !name ||
    !roaster ||
    !origin ||
    !roastDate ||
    typeof totalWeight !== "number"
  ) {
    res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
    return;
  }

  try {
    const newBean = await prisma.coffeeInventory.create({
      data: {
        name,
        roaster,
        origin,
        process: process || null,
        roastDate: new Date(roastDate),
        totalWeight,
        gramsRemaining: totalWeight,
        opened: false,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json({ success: true, data: newBean });
  } catch (error) {
    console.error("POST /coffee failed:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to add coffee bean" });
  }
});

// PUT /coffee/:id - Update a coffee bean
coffeeRouter.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    name,
    roaster,
    origin,
    roastDate,
    totalWeight,
    gramsRemaining,
    opened,
  } = req.body;

  try {
    const updatedBean = await prisma.coffeeInventory.update({
      where: { id },
      data: {
        name,
        roaster,
        origin,
        roastDate: roastDate ? new Date(roastDate) : undefined,
        totalWeight,
        gramsRemaining,
        opened,
      },
    });

    res.status(200).json({ success: true, data: updatedBean });
  } catch (error) {
    console.error(`PUT /coffee/${id} failed:`, error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update coffee bean" });
  }
});

// DELETE /coffee/:id - Remove a coffee bean
coffeeRouter.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.coffeeInventory.delete({ where: { id } });
    res.status(200).json({ success: true, message: "Coffee bean deleted" });
  } catch (error) {
    console.error(`DELETE /coffee/${id} failed:`, error);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete coffee bean" });
  }
});

export default coffeeRouter;
