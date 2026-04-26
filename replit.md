# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Product: Tasteful

A polished food ordering website. Customers browse a curated menu by category, view dish detail with ingredients/spice/calories/prep time, add items to a persistent cart, and complete a delivery checkout. Order totals are recomputed server-side (subtotal + 8.75% tax + $4.99 delivery) and stored in Postgres. Order confirmation and a recent orders page round out the flow.

- **Frontend artifact**: `artifacts/tasteful` (React + Vite, wouter routing, TanStack Query, Tailwind, shadcn/ui)
- **Backend artifact**: `artifacts/api-server` (Express 5)
- **Branding**: Saffron / Cream / Charcoal palette, Playfair Display + DM Sans
- **Endpoints**: `/api/categories`, `/api/dishes`, `/api/dishes/:id`, `/api/orders` (POST/GET), `/api/orders/:id`, `/api/stats/summary`, `/api/stats/popular-dishes`
- **Static images**: served at `/api/images/*` (mounts `attached_assets/`)
- **Cart state**: client-side React Context persisted to `localStorage`
- **Seed data**: 8 categories, 15 dishes — run `pnpm --filter @workspace/scripts run seed`

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
