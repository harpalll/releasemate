import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export const config = {
  PORT: Number(process.env.PORT) || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
};
