# API Testing Guide

## Test the Backend API

The backend server should be running on `http://localhost:5000`

### 1. Get All Bookmarks

```bash
curl http://localhost:5000/bookmarks
```

### 2. Get Bookmarks by Tag

```bash
curl http://localhost:5000/bookmarks?tag=react
```

### 3. Create a New Bookmark

```bash
curl -X POST http://localhost:5000/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "title": "Example Website",
    "description": "This is a test bookmark",
    "tags": ["test", "example"]
  }'
```

### 4. Update a Bookmark

```bash
curl -X PUT http://localhost:5000/bookmarks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'
```

### 5. Delete a Bookmark

```bash
curl -X DELETE http://localhost:5000/bookmarks/1
```

## Test the Frontend

Open your browser and navigate to:

```
http://localhost:3000
```

### Features to Test:

1. **View Bookmarks**: You should see 5 seed bookmarks displayed in a grid
2. **Search**: Type in the search box to filter by title or URL
3. **Add Bookmark**: Click "+ Add Bookmark" button and fill in the form
4. **Edit Bookmark**: Click "Edit" on any bookmark card
5. **Delete Bookmark**: Click "Delete" and confirm
6. **Filter by Tag**: Click on any tag to filter bookmarks
7. **Clear Filter**: Click "Clear filter" when a tag is active

## Validation Tests

### Test Invalid URL

Try creating a bookmark with an invalid URL:

```bash
curl -X POST http://localhost:5000/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "not-a-valid-url",
    "title": "Test"
  }'
```

Expected: 400 Bad Request with validation error

### Test Missing Title

```bash
curl -X POST http://localhost:5000/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com"
  }'
```

Expected: 400 Bad Request with validation error

### Test Too Many Tags

```bash
curl -X POST http://localhost:5000/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "title": "Test",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"]
  }'
```

Expected: 400 Bad Request with validation error

### Test Non-existent Bookmark

```bash
curl -X DELETE http://localhost:5000/bookmarks/999
```

Expected: 404 Not Found
