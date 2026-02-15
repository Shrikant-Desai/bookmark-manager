import express, { Request, Response } from "express";
import cors from "cors";
import { bookmarkStore } from "./store";
import { BookmarkSchema, UpdateBookmarkSchema } from "./types";
import { ZodError } from "zod";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GET /bookmarks - Get all bookmarks with optional tag filtering
app.get("/bookmarks", (req: Request, res: Response) => {
  try {
    const { tag } = req.query;
    const bookmarks = bookmarkStore.getAll(tag as string | undefined);
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /bookmarks - Create a new bookmark
app.post("/bookmarks", (req: Request, res: Response) => {
  try {
    const validatedData = BookmarkSchema.parse(req.body);
    const bookmark = bookmarkStore.create(validatedData);
    res.status(201).json(bookmark);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// PUT /bookmarks/:id - Update a bookmark
app.put("/bookmarks/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = UpdateBookmarkSchema.parse(req.body);
    const bookmark = bookmarkStore.update(id, validatedData);

    if (!bookmark) {
      res.status(404).json({ error: "Bookmark not found" });
      return;
    }

    res.json(bookmark);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// DELETE /bookmarks/:id - Delete a bookmark
app.delete("/bookmarks/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = bookmarkStore.delete(id);

    if (!deleted) {
      res.status(404).json({ error: "Bookmark not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
