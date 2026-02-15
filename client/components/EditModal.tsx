"use client";

import { Bookmark, BookmarkInput } from "@/types/bookmark";
import BookmarkForm from "./BookmarkForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditModalProps {
  bookmark: Bookmark | null;
  onSave: (id: string, data: BookmarkInput) => Promise<void>;
  onClose: () => void;
}

export default function EditModal({
  bookmark,
  onSave,
  onClose,
}: EditModalProps) {
  if (!bookmark) return null;

  const handleSubmit = async (data: BookmarkInput) => {
    await onSave(bookmark.id, data);
    onClose();
  };

  return (
    <Dialog open={!!bookmark} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Bookmark</DialogTitle>
          <DialogDescription>
            Make changes to your bookmark here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <BookmarkForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          initialData={{
            url: bookmark.url,
            title: bookmark.title,
            description: bookmark.description,
            tags: bookmark.tags,
          }}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
