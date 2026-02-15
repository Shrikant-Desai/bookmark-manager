/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchBookmarks(tag?: string) {
  const url = tag
    ? `${API_BASE_URL}/bookmarks?tag=${encodeURIComponent(tag)}`
    : `${API_BASE_URL}/bookmarks`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch bookmarks");
  }

  return response.json();
}

export async function createBookmark(data: any) {
  const response = await fetch(`${API_BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create bookmark");
  }

  return response.json();
}

export async function updateBookmark(id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update bookmark");
  }

  return response.json();
}

export async function deleteBookmark(id: string) {
  const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete bookmark");
  }
}
