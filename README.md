# VOYA

VOYA is a luxury travel SaaS platform with a Next.js frontend and an independent Node.js API. The existing editorial frontend remains at the repository root for Vercel compatibility; all authentication, authorization, persistence, reservations, subscriptions, administration, and media operations live in `backend/`.

## Architecture

```text
Browser
  ├─ HTTPS → Vercel / Next.js 15 frontend
  └─ HTTPS → ISOGrid / Express REST API
                     ├─ Prisma → ISOGrid managed PostgreSQL
                     └─ S3 API → ISOGrid MinIO private bucket
```

- Frontend: Next.js 15, React 19, Tailwind CSS. Public catalog pages read the REST API; authenticated account and admin views make credentialed browser requests.
- Backend: Express 5 + TypeScript, versioned under `/api/v1`, listening on `0.0.0.0:$PORT`.
- Authentication: application-owned Argon2id passwords and 7-day verified JWTs in `HttpOnly`, `Secure` cookies. Mutations use a double-submit CSRF token. Authorization and ownership checks are server-side.
- Database: PostgreSQL via Prisma with an additive initial migration, constraints, relationships, and query indexes.
- Media: validated JPEG, PNG, WebP, or AVIF uploads to a private ISOGrid MinIO bucket. API responses use expiring signed URLs.
- Payments: intentionally disabled. Premium checkout and cancellation return `PAYMENTS_NOT_CONFIGURED` until a real provider and verified webhook lifecycle are implemented.

ISOGrid also offers managed Keycloak 26. It can be adopted later as an OIDC issuer, but this implementation uses application authentication so VOYA is deployable without coupling customer identity to an unprovisioned service.

## Repository structure

```text
src/
  app/
    account/                 customer portal routes
    admin/                   protected studio routes
    destinations|stays|experiences/
  components/
    portal/                  customer/auth UI
    admin/                   admin UI
  hooks/useCatalog.ts        browser catalog adapter
  lib/api.ts                 credentialed REST client
  lib/serverCatalog.ts       server-rendered catalog adapter
backend/
  prisma/
    schema.prisma
    migrations/              non-destructive PostgreSQL migration
    seed.ts                  plans + preserved VOYA catalog content
  src/
    config/ lib/ middleware/
    modules/
      auth/ catalog/ me/ subscriptions/ reservations/ admin/ media/
    app.ts server.ts
  tests/
  Dockerfile
```

## Customer portal

Routes: `/login`, `/register`, `/account`, `/account/profile`, `/account/favorites`, `/account/trips`, `/account/reservations`, `/account/subscription`, and `/account/settings`.

The backend enforces customer ownership on favorites, trips, profile records, and reservations. A FREE plan permits 10 favorites and 3 trips. PREMIUM removes those limits, enables priority reservations, and unlocks premium catalog records. Entitlements are read from PostgreSQL for every protected operation.

## Admin studio

Routes: `/admin`, `/admin/destinations`, `/admin/hotels`, `/admin/experiences`, `/admin/reservations`, `/admin/users`, `/admin/subscriptions`, `/admin/media`, and `/admin/analytics`.

All admin APIs require `ADMIN` or `SUPER_ADMIN`. User updates, catalog publication/archival, reservation transitions, and media uploads are audited. Only `SUPER_ADMIN` can grant the super-admin role. Reservation transitions are validated rather than accepted as arbitrary status changes.

## REST API

Key endpoints:

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
GET    /api/v1/auth/csrf

GET    /api/v1/destinations
GET    /api/v1/destinations/:slug
POST   /api/v1/destinations                 ADMIN
PATCH  /api/v1/destinations/:id             ADMIN
DELETE /api/v1/destinations/:id             ADMIN (archives)

GET    /api/v1/hotels
GET    /api/v1/hotels/:id-or-slug
POST|PATCH|DELETE /api/v1/hotels/...         ADMIN

GET    /api/v1/experiences
GET    /api/v1/experiences/:id-or-slug
POST|PATCH|DELETE /api/v1/experiences/...    ADMIN

GET|PATCH  /api/v1/me/profile
GET|POST   /api/v1/me/favorites
DELETE     /api/v1/me/favorites/:id
GET|POST   /api/v1/me/trips
PATCH|DELETE /api/v1/me/trips/:id
GET|POST   /api/v1/me/reservations
GET        /api/v1/me/subscription

GET    /api/v1/subscription/plans
POST   /api/v1/subscription/checkout         disabled until provider exists
POST   /api/v1/subscription/cancel           provider-controlled only

GET    /api/v1/admin/analytics
GET    /api/v1/admin/users
PATCH  /api/v1/admin/users/:id
GET    /api/v1/admin/reservations
PATCH  /api/v1/admin/reservations/:id/status
GET    /api/v1/admin/subscriptions
GET|POST /api/v1/admin/media
GET    /health
```

List endpoints accept `page`, `pageSize`, and relevant `q`, `region`, `category`, or `featured` filters. Responses use `{ success, data, meta? }`; errors use `{ success: false, error: { code, message, details? } }`.

## Local development

Requirements: Node.js 22 and PostgreSQL.

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_VOYA_API_URL=http://localhost:3000`.
2. Copy `backend/.env.example` to `backend/.env` and provide local PostgreSQL and S3-compatible development credentials.
3. Install and initialize:

```bash
npm install
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate:deploy
npm run prisma:seed
```

4. Run `npm run dev` at the repository root and in `backend/` in separate terminals.

Never use `prisma migrate reset` against shared or production data. For schema changes, create and review a new additive migration locally, back up production, then run `npm run prisma:migrate:deploy` as a controlled release step.

## Environment variables

Frontend (Vercel):

```text
NEXT_PUBLIC_VOYA_API_URL=https://api.your-voya-domain.example
```

Backend (ISOGrid):

```text
DATABASE_URL             secret; ISOGrid PostgreSQL connection string
PORT                     ordinary value, normally 3000
NODE_ENV                 production
FRONTEND_URL             exact Vercel/custom frontend origin; no wildcard
AUTH_SECRET              secret; at least 32 random characters
COOKIE_DOMAIN            optional; shared parent domain such as .example.com
S3_ENDPOINT              ISOGrid store HTTPS endpoint, without bucket path
S3_REGION                us-east-1 for ISOGrid MinIO
S3_BUCKET                pre-created private bucket
S3_ACCESS_KEY_ID         secret; bucket-limited application key
S3_SECRET_ACCESS_KEY     secret; shown once by ISOGrid
```

For SSR access to authenticated premium detail pages, use sibling custom domains such as `www.example.com` and `api.example.com`, set `COOKIE_DOMAIN=.example.com`, and keep both origins HTTPS-only. Local development should leave `COOKIE_DOMAIN` empty.

## Deploy the backend to ISOGrid

These steps follow the official ISOGrid documentation for [repository deployment](https://docs.isogrid.skyvault.pro/guide/git-repositories), [application deployment](https://docs.isogrid.skyvault.pro/guide/deploying-an-application), [databases](https://docs.isogrid.skyvault.pro/guide/databases), [object storage](https://docs.isogrid.skyvault.pro/guide/object-storage), and [domains](https://docs.isogrid.skyvault.pro/guide/addresses-and-domains).

1. In ISOGrid Integrations, install the ISOGrid GitHub app and grant it access only to this repository.
2. Provision a managed PostgreSQL instance. For production, select pooling or high availability according to load/availability needs, enable daily backups, and verify a restore. Keep the application and database on the same ISOGrid private network.
3. Copy its `postgresql://...` connection string once and store it as the application secret `DATABASE_URL`. Do not use an ordinary readable environment value.
4. Provision a MinIO object store. Create a private lowercase bucket (for example `voya-media`), then create a read/write key limited to that bucket. Publish the store to receive its HTTPS S3 endpoint. ISOGrid MinIO requires region `us-east-1` and path-style addressing; the backend enables path style.
5. Create an application from the GitHub repository/branch. ISOGrid detects `backend/Dockerfile`; select that backend application and set its exposed port to `3000` (or the same value supplied as `PORT`). The image binds on `0.0.0.0`.
6. Put ordinary settings (`PORT`, `NODE_ENV`, `FRONTEND_URL`, `COOKIE_DOMAIN`, `S3_ENDPOINT`, `S3_REGION`, `S3_BUCKET`) in application environment configuration. Put `DATABASE_URL`, `AUTH_SECRET`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` in ISOGrid secret environment values.
7. Deploy. Verify `https://<isogrid-app-address>/health` before attaching a custom domain. ISOGrid automatically provides and renews TLS for its platform address; a custom domain currently requires attaching the hostname and uploading/renewing its certificate as documented by ISOGrid.
8. Run migrations as a controlled one-off operation from a trusted machine that can reach the database, or from an explicitly configured release job:

```bash
cd backend
npm ci
npm run prisma:migrate:deploy
npm run prisma:seed
```

9. Set the resulting API HTTPS address as `NEXT_PUBLIC_VOYA_API_URL` in Vercel and redeploy the frontend. Set `FRONTEND_URL` to the exact frontend production origin and redeploy the backend so CORS remains allowlisted.
10. Register the intended owner through the normal VOYA registration flow, then bootstrap the first super administrator once from a trusted machine with database access: `npm run admin:promote -- owner@example.com`. The operation is recorded in `AdminAuditLog`.
11. For customer-facing production, run at least two ISOGrid application replicas to avoid single-copy deployment gaps. Monitor logs, database connection limits, backups, and object-store backups; ISOGrid does not back up object storage automatically.

ISOGrid does not run database migrations automatically during an application deployment. Do not put destructive migrations in container startup.

## Validation status

- Frontend TypeScript: passes.
- Frontend production build: passes (39 routes, including dynamic catalog detail routes).
- Backend TypeScript production build: passes.
- Backend tests: 4 pass; PostgreSQL integration test is present and skipped without `TEST_DATABASE_URL`.
- Backend production dependency audit: 0 known vulnerabilities.
- Full frontend lint: currently blocked by repository-wide pre-existing Prettier violations and the legacy `next lint` setup. Files added for this implementation were formatted with the configured Prettier rules.
- Frontend dependency audit: reports transitive PostCSS/Vite advisories; npm proposes breaking framework/plugin upgrades. They were not force-applied. Upgrade Next.js and the Rocket/Dhiwise development tooling in a dedicated compatibility change.

No credentials were added, no production database was touched, and nothing was committed, pushed, or deployed.
