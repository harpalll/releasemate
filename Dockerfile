FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS backend-deps
COPY backend/package.json backend/bun.lock ./
COPY backend/prisma ./prisma
COPY backend/prisma.config.ts ./
RUN bun install --frozen-lockfile

FROM base AS frontend-deps
COPY frontend/package.json frontend/bun.lock ./
RUN bun install --frozen-lockfile

FROM frontend-deps AS frontend-build
COPY frontend/ .
RUN bun run build

FROM backend-deps AS production
COPY backend/ .
COPY --from=frontend-build /app/dist ./public
EXPOSE 3001
CMD ["bun", "run", "src/index.ts"]
