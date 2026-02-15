# Quick Start Guide

## 🚀 Running the Application

The application is **ALREADY RUNNING** on your system!

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 What You Can Do Now

### 1. Open the Application

Simply open your browser and go to:

```
http://localhost:3000
```

### 2. Try These Features

#### View Bookmarks

- You'll see 5 pre-loaded bookmarks in a grid layout
- Each card shows title, URL, description, and tags

#### Search Bookmarks

- Type in the search box at the top
- Searches through titles and URLs in real-time

#### Add a New Bookmark

1. Click the "+ Add Bookmark" button
2. Fill in the form:
   - **URL**: Must be a valid URL (e.g., https://example.com)
   - **Title**: Required, max 200 characters
   - **Description**: Optional, max 500 characters
   - **Tags**: Comma-separated, max 5 tags (e.g., "react, tutorial, web")
3. Click "Add Bookmark"

#### Edit a Bookmark

1. Click "Edit" on any bookmark card
2. A modal will open with the current values
3. Make your changes
4. Click "Save Changes"

#### Delete a Bookmark

1. Click "Delete" on any bookmark card
2. Click "Confirm Delete" to confirm
3. Or click "Cancel" to abort

#### Filter by Tag

1. Click on any tag badge (e.g., #react)
2. The list will filter to show only bookmarks with that tag
3. Click "Clear filter" to see all bookmarks again

## 🛑 Stopping the Application

To stop both servers, press:

```
Ctrl + C
```

in the terminal where `npm run dev` is running.

## 🔄 Restarting the Application

If you stopped the servers, restart with:

```bash
npm run dev
```

## 📝 Testing the API Directly

### Get All Bookmarks

```bash
curl http://localhost:5000/bookmarks
```

### Filter by Tag

```bash
curl http://localhost:5000/bookmarks?tag=react
```

### Create a Bookmark

```bash
curl -X POST http://localhost:5000/bookmarks -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\",\"title\":\"Example\",\"tags\":[\"test\"]}"
```

## 📂 Important Files

- **Frontend Code**: `client/app/page.tsx`
- **Backend Code**: `server/src/index.ts`
- **Data Storage**: `server/bookmarks.json`
- **Documentation**: `README.md`

## ⚠️ Troubleshooting

### Port Already in Use

If you get a port error:

1. Stop the current process (Ctrl + C)
2. Kill any process using port 3000 or 5000
3. Run `npm run dev` again

### Changes Not Showing

1. Make sure you saved the file
2. The servers auto-reload on file changes
3. Refresh your browser (Ctrl + R or F5)

### Data Not Persisting

- All data is saved to `server/bookmarks.json`
- Check this file to see your bookmarks
- If deleted, it will be recreated with seed data on next start

## 🎉 You're All Set!

The application is fully functional and ready to use. Open http://localhost:3000 in your browser to start managing bookmarks!
