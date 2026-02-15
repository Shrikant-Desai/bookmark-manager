import fs from "fs";
import path from "path";
import { Bookmark, BookmarkInput, UpdateBookmarkInput } from "./types";

const DATA_FILE = path.join(__dirname, "../bookmarks.json");

class BookmarkStore {
  private bookmarks: Bookmark[] = [];

  constructor() {
    this.loadFromFile();
    if (this.bookmarks.length === 0) {
      this.seedData();
    }
  }

  private loadFromFile() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        this.bookmarks = JSON.parse(data);
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      this.bookmarks = [];
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.bookmarks, null, 2));
    } catch (error) {
      console.error("Error saving bookmarks:", error);
    }
  }

  private seedData() {
    const seedBookmarks: Bookmark[] = [
      {
        id: "1",
        url: "https://nextjs.org",
        title: "Next.js - The React Framework",
        description:
          "The React Framework for Production - Next.js gives you the best developer experience",
        tags: ["react", "nextjs", "framework"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        url: "https://www.typescriptlang.org",
        title: "TypeScript: JavaScript With Syntax For Types",
        description:
          "TypeScript extends JavaScript by adding types to the language",
        tags: ["typescript", "javascript", "programming"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        url: "https://tailwindcss.com",
        title: "Tailwind CSS - Rapidly build modern websites",
        description: "A utility-first CSS framework packed with classes",
        tags: ["css", "tailwind", "design"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        url: "https://expressjs.com",
        title: "Express - Node.js web application framework",
        description:
          "Fast, unopinionated, minimalist web framework for Node.js",
        tags: ["nodejs", "express", "backend"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "5",
        url: "https://github.com/colinhacks/zod",
        title: "Zod - TypeScript-first schema validation",
        description:
          "TypeScript-first schema validation with static type inference",
        tags: ["typescript", "validation", "zod"],
        createdAt: new Date().toISOString(),
      },
    ];

    this.bookmarks = seedBookmarks;
    this.saveToFile();
  }

  getAll(tag?: string): Bookmark[] {
    if (tag) {
      return this.bookmarks.filter((bookmark) =>
        bookmark.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
      );
    }
    return this.bookmarks;
  }

  getById(id: string): Bookmark | undefined {
    return this.bookmarks.find((bookmark) => bookmark.id === id);
  }

  create(input: BookmarkInput): Bookmark {
    const bookmark: Bookmark = {
      id: Date.now().toString(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    this.bookmarks.push(bookmark);
    this.saveToFile();
    return bookmark;
  }

  update(id: string, input: UpdateBookmarkInput): Bookmark | null {
    const index = this.bookmarks.findIndex((bookmark) => bookmark.id === id);
    if (index === -1) return null;

    this.bookmarks[index] = {
      ...this.bookmarks[index],
      ...input,
    };
    this.saveToFile();
    return this.bookmarks[index];
  }

  delete(id: string): boolean {
    const index = this.bookmarks.findIndex((bookmark) => bookmark.id === id);
    if (index === -1) return false;

    this.bookmarks.splice(index, 1);
    this.saveToFile();
    return true;
  }
}

export const bookmarkStore = new BookmarkStore();
