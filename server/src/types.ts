import { z } from "zod";

export const BookmarkSchema = z.object({
  url: z.string().url("Invalid URL format"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
  tags: z
    .array(
      z
        .string()
        .toLowerCase()
        .refine((tag) => tag === tag.toLowerCase(), "Tags must be lowercase"),
    )
    .max(5, "Maximum 5 tags allowed")
    .optional(),
});

export const UpdateBookmarkSchema = BookmarkSchema.partial();

export type BookmarkInput = z.infer<typeof BookmarkSchema>;
export type UpdateBookmarkInput = z.infer<typeof UpdateBookmarkSchema>;

export interface Bookmark extends BookmarkInput {
  id: string;
  createdAt: string;
}
