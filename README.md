# releasemate

A release checklist tool that helps developers track their release process. Built as a single-page application with a REST API backend.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, TanStack Query, React Hook Form, Zod
- **Backend:** Bun, Express, TypeScript, Prisma v7, Zod
- **Database:** PostgreSQL (Neon)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0
- PostgreSQL database (or use Docker)

### Local Development

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/harpalll/releasemate.git
cd releasemate

cd backend && bun install
cd ../frontend && bun install
```

2. Set up the database:

```bash
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL
bunx prisma db push
```

3. Start both servers:

```bash
# Terminal 1 - Backend (port 3001)
cd backend && bun run dev

# Terminal 2 - Frontend (port 5173, proxies /api to backend)
cd frontend && bun run dev
```

### Docker

```bash
docker compose up --build
```

App will be available at `http://localhost:3001`.

## Database Schema

### `releases` table

| Column           | Type        | Description                        |
|------------------|-------------|------------------------------------|
| id               | UUID (PK)   | Auto-generated unique identifier   |
| name             | TEXT        | Release name (required)            |
| date             | TIMESTAMP   | Release date (required)            |
| additional_info  | TEXT        | Optional notes                     |
| completed_steps  | INT[]       | Array of completed step indices    |
| created_at       | TIMESTAMP   | Auto-set on creation               |
| updated_at       | TIMESTAMP   | Auto-updated on modification       |

Status is computed from `completed_steps`, not stored:
- **planned** — no steps completed
- **ongoing** — at least one step completed
- **done** — all 7 steps completed

## API Endpoints

| Method   | Endpoint              | Description            |
|----------|-----------------------|------------------------|
| `GET`    | `/api/releases`       | List all releases      |
| `GET`    | `/api/releases/:id`   | Get a single release   |
| `POST`   | `/api/releases`       | Create a new release   |
| `PATCH`  | `/api/releases/:id`   | Update a release       |
| `DELETE` | `/api/releases/:id`   | Delete a release       |

### Request/Response Examples

**POST /api/releases**
```json
{
  "name": "Version 1.0.1",
  "date": "2025-09-20",
  "additionalInfo": "First stable release"
}
```

**PATCH /api/releases/:id**
```json
{
  "completedSteps": [0, 1, 2],
  "additionalInfo": "Updated notes"
}
```

## Running Tests

```bash
cd backend && bun test
```

## Project Structure

```
releasemate/
├── backend/
│   ├── src/
│   │   ├── controllers/    # HTTP request handling
│   │   ├── services/       # Business logic
│   │   ├── repositories/   # Data access (Prisma)
│   │   ├── routes/         # Express route definitions
│   │   ├── middleware/      # Error handling
│   │   ├── config.ts       # Environment config
│   │   ├── db.ts           # Prisma client setup
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   └── schema.prisma
│   └── tests/
├── frontend/
│   └── src/
│       ├── api/            # API client
│       ├── components/
│       │   ├── layout/     # BrowserFrame, PageHeader, Breadcrumb
│       │   └── ui/         # Button, Card, TextInput, etc.
│       ├── lib/            # Constants, utilities
│       ├── pages/          # ReleasesListPage, ReleaseDetailPage
│       └── types/
├── Dockerfile
└── docker-compose.yaml
```
