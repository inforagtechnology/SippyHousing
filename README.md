# Sippy Estate Elegance

Real estate web app with a public property showcase and an admin panel for managing properties, images, and client leads.

## Tech Stack

- Frontend framework: React 18 + TypeScript
- Build tool: Vite 5
- Routing: React Router v6
- State/data fetching: TanStack React Query
- Styling: Tailwind CSS + shadcn/ui (Radix UI primitives)
- Forms/validation: React Hook Form + Zod
- Icons/charts: Lucide React, Recharts
- Backend platform: Supabase (`@supabase/supabase-js`)
- Deployment: Vercel (SPA rewrite configured in `vercel.json`)

## UI / Frontend Overview

The UI is a single-page React app with two main experiences:

1. Public website
- Home and category sections (Luxury, Commercial, Hotels, Plots/Lands, International, etc.)
- Property listing/search flow
- Property detail pages
- About, Favorites, and contact/lead capture surfaces

2. Admin panel
- Login page (`/admin/login`)
- Dashboard and protected routes (`/admin`, `/admin/properties`, `/admin/add-property`, `/admin/edit-property/:id`, `/admin/clients`)
- Property CRUD and image handling
- Client lead viewing/management

Key UI structure:
- App entry and routing: `src/main.tsx`, `src/App.tsx`
- Shared layout/components: `src/components/layout`, `src/components/ui`
- Route pages: `src/pages/*`
- Domain sections: `src/components/sections/*`

## Backend Overview

There is no separate custom Node/Express API server in this repo.
The app uses **Supabase as Backend-as-a-Service** and calls it directly from the frontend.

### Supabase usage

- Client setup: `src/lib/supabase.ts`
- Property operations: `src/services/propertyService.ts`
  - CRUD on `properties`
  - Search/filter helpers
  - Image metadata in `property_images`
- Client/lead operations: `src/services/clientService.ts`
  - CRUD on `clients`
- File storage:
  - Uploads to Supabase Storage bucket `listings`

### Database & schema artifacts

- SQL/migrations are included under:
  - `migrations/`
  - `clients_table.sql`
  - `resale_rental_migration.sql`
- Additional setup docs:
  - `SUPABASE_SETUP.md`
  - `SUPABASE_STORAGE_SETUP.md`
  - `CLIENTS_TABLE_SETUP.md`

## Authentication Note (Important)

Admin authentication is currently **frontend-only**:
- Credentials are hardcoded in `src/pages/AdminLogin.tsx`
- Session check uses `localStorage` via `src/components/common/ProtectedRoute.tsx`

This is suitable for demo/internal use, but should be replaced with secure server-side auth (preferably Supabase Auth + row-level security) before production hardening.

## Environment Variables

Create `.env` (or copy from `env.example`):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Run Locally

```bash
npm install
npm run dev
```

Other useful scripts:

```bash
npm run build
npm run preview
npm run lint
npm run seed:properties
npm run seed:delete
```

## Project Structure (High-Level)

- `src/pages/` -> route-level screens
- `src/components/` -> reusable UI, layout, domain sections
- `src/services/` -> Supabase data access layer
- `src/lib/` -> shared libs/config (`supabase`, utilities)
- `migrations/` + `*.sql` -> database schema changes
- `public/` -> static assets
