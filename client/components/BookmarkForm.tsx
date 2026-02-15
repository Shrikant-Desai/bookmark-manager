"use client";

import { useState } from "react";
import { BookmarkInput } from "@/types/bookmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BookmarkFormProps {
  onSubmit: (data: BookmarkInput) => Promise<void>;
  onCancel?: () => void;
  initialData?: BookmarkInput;
  submitLabel?: string;
}

export default function BookmarkForm({
  onSubmit,
  onCancel,
  initialData,
  submitLabel = "Add Bookmark",
}: BookmarkFormProps) {
  const [formData, setFormData] = useState<BookmarkInput>(
    initialData || {
      url: "",
      title: "",
      description: "",
      tags: [],
    },
  );
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || "",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate URL
    if (!formData.url) {
      newErrors.url = "URL is required";
    } else {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = "Invalid URL format";
      }
    }

    // Validate title
    if (!formData.title) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be 200 characters or less";
    }

    // Validate description
    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must be 500 characters or less";
    }

    // Validate tags
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0);

    if (tags.length > 5) {
      newErrors.tags = "Maximum 5 tags allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0);

    const submitData: BookmarkInput = {
      ...formData,
      tags: tags.length > 0 ? tags : undefined,
    };

    try {
      await onSubmit(submitData);
      // Reset form
      setFormData({ url: "", title: "", description: "", tags: [] });
      setTagsInput("");
      setErrors({});
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "Failed to submit",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">URL *</Label>
        <Input
          type="text"
          id="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://example.com"
        />
        {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Bookmark title"
          maxLength={200}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Optional description"
          rows={3}
          maxLength={500}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated, max 5)</Label>
        <Input
          type="text"
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="react, javascript, tutorial"
        />
        {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {errors.submit}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>

        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
