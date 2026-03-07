# Zeneth — Fashion Designer Website

A dark gothic + graffiti-inspired fashion portfolio for the brand **Zeneth**. Built with React, TypeScript, Tailwind CSS, and a lightweight Express backend for content management.

## Tech stack

- **Frontend:** React 18, Vite, TypeScript, React Router, Tailwind CSS
- **Backend:** Node.js, Express (JSON file storage, no database)
- **Admin:** In-app admin at `/admin` for About, Collections, and Other Drawings

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Copy assets into `public`** (so the dev server can serve images from `img/` and `style/`):
   ```bash
   npm run prepare-assets
   ```
   This copies `img/` and `style/` into `public/img` and `public/style`.

3. **Run frontend only** (uses seed data if backend is not running):
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173).

4. **Run with backend** (for editable content and uploads):
   ```bash
   npm run dev:full
   ```
   - Frontend: [http://localhost:5173](http://localhost:5173)  
   - API: [http://localhost:3001](http://localhost:3001)  
   - Admin: [http://localhost:5173/admin](http://localhost:5173/admin)

## Project structure

- `src/` — React app
  - `api/client.ts` — Data fetching; uses API when available, else seed data
  - `components/` — Layout, CollectionCard, StyleBlock, PageSection
  - `data/seed.ts` — Seed data for HK Gothic Rebellion and About
  - `pages/` — Home, About, Collections, CollectionDetail, Drawings
  - `pages/admin/` — Admin layout, About, Collections, Drawings management
  - `types/` — AboutData, Collection, Style, Drawing
- `server/` — Express API and file uploads
- `server/data/` — Created at runtime; stores `about.json`, `collections.json`, `drawings.json`
- `public/uploads/` — Uploaded images (when using backend)

## Content behaviour

- **No backend / empty data:** The site uses built-in seed data (About + HK Gothic Rebellion collection with 6 styles from the `style/` folder).
- **With backend:** All content is loaded from the API. Use the Admin panel to edit About, create/edit collections and styles, and manage Other Drawings. Uploads are saved under `public/uploads/`.

## Build

```bash
npm run build
npm run preview   # serve production build
```

Serve the backend separately (e.g. `npm run server`) when you need live content and uploads in production.

## Adding more collections

Use **Admin → Collections**: create a collection, set title/slug/cover/summary, then add styles (main photo, feature photo, description). No code changes required.
