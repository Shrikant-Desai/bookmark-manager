"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkInput } from "@/types/bookmark";
import {
  fetchBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from "@/lib/api";
import BookmarkCard from "@/components/BookmarkCard";
import BookmarkForm from "@/components/BookmarkForm";
import EditModal from "@/components/EditModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch bookmarks
  const loadBookmarks = async (tag?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBookmarks(tag);
      setBookmarks(data);
      setFilteredBookmarks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  // Filter bookmarks by search query
  useEffect(() => {
    let filtered = bookmarks;

    if (searchQuery) {
      filtered = filtered.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredBookmarks(filtered);
  }, [searchQuery, bookmarks]);

  // Handle tag filter
  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
      loadBookmarks();
    } else {
      setActiveTag(tag);
      loadBookmarks(tag);
    }
    setSearchQuery("");
  };

  // Handle add bookmark
  const handleAddBookmark = async (data: BookmarkInput) => {
    try {
      await createBookmark(data);
      await loadBookmarks(activeTag || undefined);
      setShowAddForm(false);
    } catch (err) {
      throw err;
    }
  };

  // Handle edit bookmark
  const handleEditBookmark = async (id: string, data: BookmarkInput) => {
    try {
      await updateBookmark(id, data);
      await loadBookmarks(activeTag || undefined);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update bookmark",
      );
    }
  };

  // Handle delete bookmark
  const handleDeleteBookmark = async (id: string) => {
    try {
      await deleteBookmark(id);
      await loadBookmarks(activeTag || undefined);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete bookmark",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📚 Bookmark Manager
          </h1>
          <p className="text-gray-700">
            Organize and manage your favorite links
          </p>
        </header>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by title or URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              variant={showAddForm ? "outline" : "default"}
            >
              {showAddForm ? "Cancel" : "+ Add Bookmark"}
            </Button>
          </div>

          {activeTag && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtered by:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                #{activeTag}
              </span>
              <Button
                onClick={() => handleTagClick(activeTag)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                Clear filter
              </Button>
            </div>
          )}
        </div>

        {/* Add Bookmark Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Bookmark</DialogTitle>
              <DialogDescription>
                Add a new bookmark to your collection. Fill in the details
                below.
              </DialogDescription>
            </DialogHeader>
            <BookmarkForm
              onSubmit={handleAddBookmark}
              onCancel={() => setShowAddForm(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading bookmarks...</p>
          </div>
        )}

        {/* Bookmarks Grid */}
        {!loading && filteredBookmarks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
            <p className="text-gray-600 text-lg">
              {searchQuery || activeTag
                ? "No bookmarks found matching your criteria"
                : "No bookmarks yet. Add your first one!"}
            </p>
          </div>
        )}

        {!loading && filteredBookmarks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onEdit={setEditingBookmark}
                onDelete={handleDeleteBookmark}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingBookmark && (
          <EditModal
            bookmark={editingBookmark}
            onSave={handleEditBookmark}
            onClose={() => setEditingBookmark(null)}
          />
        )}
      </div>
    </div>
  );
}
