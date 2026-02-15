# Bookmark Manager

A full-stack web application for managing bookmarks with a REST API backend and Next.js frontend.

## 🚀 Features

- **Add Bookmarks**: Create new bookmarks with URL, title, description, and tags
- **Edit Bookmarks**: Update existing bookmarks with a modal interface
- **Delete Bookmarks**: Remove bookmarks with confirmation dialog
- **Filter by Tag**: Click on any tag to filter bookmarks
- **Real-time Search**: Search bookmarks by title or URL
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Persistence**: All bookmarks are saved to a JSON file

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** for UI components
- **React Server Components & Client Components**
- **Fetch API** for HTTP requests

### Backend

- **Node.js**
- **Express**
- **TypeScript**
- **Zod** for validation
- **CORS** enabled
- **In-memory store** with JSON file persistence

## 📦 Project Structure

```
bookmark-manager/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   ├── lib/              # API client
│   └── types/            # TypeScript types
├── server/                # Express backend
│   └── src/
│       ├── index.ts      # Server entry point
│       ├── store.ts      # Data store
│       └── types.ts      # Validation schemas
├── package.json          # Root package with scripts
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**

2. **Install all dependencies** (root, server, and client):

```bash
npm run install:all
```

3. **Start both frontend and backend**:

```bash
npm run dev
```

This single command will start:

- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`

4. **Open your browser** and navigate to `http://localhost:3000`

## 📝 API Endpoints

| Method | Endpoint         | Description                                     |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | `/bookmarks`     | Get all bookmarks (supports `?tag=value` query) |
| POST   | `/bookmarks`     | Create a new bookmark                           |
| PUT    | `/bookmarks/:id` | Update a bookmark                               |
| DELETE | `/bookmarks/:id` | Delete a bookmark                               |

### Data Model

```typescript
{
  id: string;              // Auto-generated
  url: string;             // Required, valid URL
  title: string;           // Required, max 200 chars
  description?: string;    // Optional, max 500 chars
  tags?: string[];         // Optional, lowercase, max 5 tags
  createdAt: string;       // ISO 8601 datetime
}
```

### Validation Rules

- **URL**: Must be a valid URL format
- **Title**: Required, maximum 200 characters
- **Description**: Optional, maximum 500 characters
- **Tags**: Optional, lowercase only, maximum 5 tags per bookmark

### HTTP Status Codes

- `200 OK` - Successful GET/PUT
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 🤖 AI Tools Used

- ** Claude / Gemini ** - Code generation and assistance
- Used for boilerplate generation, component structure, and TypeScript types
- Helped with Tailwind CSS styling and responsive design

## 💡 Assumptions Made

1. **No Authentication**: The application is designed for single-user local use without authentication
2. **Local Storage**: Using JSON file for persistence is sufficient (no database required)
3. **Simple Validation**: Client-side and server-side validation using Zod schemas
4. **No Pagination**: All bookmarks are loaded at once (suitable for personal use)
5. **Tag Filtering**: Only one tag filter can be active at a time
6. **Search**: Real-time client-side search (not API-based)
7. **Browser Support**: Modern browsers with ES6+ support

## 🎨 Design Decisions

1. **Monorepo Structure**: Keeps frontend and backend in one repository for easier development
2. **TypeScript**: Used throughout for type safety and better developer experience
3. **Tailwind CSS**: Utility-first CSS for rapid UI development
4. **Component Separation**: Reusable components (BookmarkCard, BookmarkForm, EditModal)
5. **Error Handling**: User-friendly error messages displayed in the UI
6. **Seed Data**: 5 pre-populated bookmarks for immediate testing

## 🔧 Development Scripts

```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend
npm run dev

# Run backend only
npm run dev:server

# Run frontend only
npm run dev:client
```

## 👨‍💻 Author

Shrikant Desai - Built as a technical assessment project
