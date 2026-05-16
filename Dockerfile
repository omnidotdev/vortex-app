# syntax=docker/dockerfile:1

FROM oven/bun:1.3.13 AS base
WORKDIR /app

# Build
FROM base AS builder
COPY package.json bun.lock .env.production ./
RUN bun install --frozen-lockfile
COPY . .

ARG VITE_BASE_URL
ARG VITE_API_BASE_URL
ARG VITE_AUTH_BASE_URL
ARG VITE_BILLING_BASE_URL
ARG VITE_CONSOLE_URL
ARG VITE_FLAGS_API_HOST
ARG VITE_FLAGS_CLIENT_KEY

RUN bun run build

# TODO: Switch back to Bun runtime once module resolution is fixed
# Bun doesn't properly resolve externalized Nitro packages (srvx, react-dom/server)
# Error: Cannot find package 'srvx' from '/app/.output/server/chunks/virtual/entry.mjs'
# Error: Cannot find module 'react-dom/server'
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 app && \
    adduser --system --uid 1001 -G app app
USER app

# Nitro bundles production deps into .output/server/node_modules.
COPY --chown=app:app --from=builder /app/.output ./.output

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:3000/api/_health || exit 1

CMD ["node", ".output/server/index.mjs"]
