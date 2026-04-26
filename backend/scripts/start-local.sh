#!/bin/sh
bunx prisma db push --skip-generate
bun run src/index.ts
