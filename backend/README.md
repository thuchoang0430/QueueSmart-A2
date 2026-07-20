# QueueSmart Backend (Assignment 3)

Node + Express + TypeScript API with in-memory storage. No database — A4 adds persistence.

## Running

```bash
cd backend
npm install
npm run dev        # http://localhost:4000
```

The front end proxies `/api` to port 4000, so run both: `npm run dev` in `backend/`
and `npm run dev` in `frontend/`.

## Testing

```bash
npm test           # run once
npm run test:watch # re-run on change
npm run coverage   # text summary + HTML report in coverage/index.html
```

Coverage thresholds are set to 70% (the A3 target). `npm run coverage` fails
below that, so add tests alongside each module rather than at the end.

## Structure

```
src/
  app.ts                     express app, exported for Supertest
  index.ts                   listen() only
  errors.ts                  ApiError - throw these from anywhere
  store/memoryStore.ts       ALL data lives here + resetStore()
  validation/validators.ts   shared required/type/length checks
  middleware/errorHandler.ts turns ApiError into the shared error body
  modules/services/          REFERENCE MODULE - copy this shape
tests/
```

**The one rule:** `*.service.ts` files contain the business logic and never
import Express. Controllers only translate HTTP to and from those functions.
That is what makes the logic unit-testable and where the coverage comes from.

## Conventions

Every error response looks like this:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": { "name": "Name is required." } } }
```

Throw `ApiError.notFound(...)`, `ApiError.conflict(...)` etc. and the error
handler formats it. `fields` appears only on validation errors.

Declare validation as a `Schema` and call `validateOrThrow(input, schema)` —
see `createServiceSchema` in `modules/services/services.service.ts`.

Every test file calls `resetStore()` in `beforeEach`. In-memory state is shared
between tests otherwise.

## Adding a module

1. `src/modules/<name>/<name>.service.ts` — logic + schema, no Express
2. `src/modules/<name>/<name>.controller.ts` — thin, `try/catch` → `next(err)`
3. `src/modules/<name>/<name>.routes.ts` — router
4. Register it in `app.ts` (there is a marked spot)
5. `tests/<name>.service.test.ts` — the bulk of the tests
6. `tests/<name>.routes.test.ts` — a few Supertest happy/error paths

## Status

| Module | Endpoints | Owner | Done |
|---|---|---|---|
| Foundation | `GET /api/health` | shared | ✅ |
| Services | `GET /api/services`, `GET /api/services/:id`, `POST /api/services` | | partial — needs `PUT /:id`, `PATCH /:id/status`, admin guard |
| Auth | `POST /api/auth/register`, `POST /api/auth/login` | | ⬜ |
| Queue | `POST/DELETE /api/queues/:serviceId/join\|leave`, `GET /api/queues/:serviceId`, `POST /api/queues/:serviceId/serve-next`, `GET /api/queues/:serviceId/me` | | ⬜ |
| Wait time | (logic used by queue) | | ⬜ |
| Notifications | `GET /api/notifications` | | ⬜ |
| History | `GET /api/history` | | ⬜ |
