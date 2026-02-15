"use client";

import { Bookmark } from "@/types/bookmark";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export default function BookmarkCard({
  bookmark,
  onEdit,
  onDelete,
  onTagClick,
}: BookmarkCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(bookmark.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.title}
            </a>
          </h3>
        </div>

        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline mb-2 block truncate"
        >
          {bookmark.url}
        </a>

        {bookmark.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {bookmark.description}
          </p>
        )}

        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {bookmark.tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => onTagClick(tag)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <Button onClick={() => onEdit(bookmark)} variant="outline" size="sm">
            Edit
          </Button>

          <Button
            onClick={() => setShowDeleteDialog(true)}
            variant="destructive"
            size="sm"
          >
            Delete
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Added: {new Date(bookmark.createdAt).toLocaleDateString()}
        </p>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              bookmark &quot;{bookmark.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} variant="destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
