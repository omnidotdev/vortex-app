# syntax=docker/dockerfile:1@sha256:2780b5c3bab67f1f76c781860de469442999ed1a0d7992a5efdf2cffc0e3d769

FROM oven/bun:1.3@sha256:e10577f0db68676a7024391c6e5cb4b879ebd17188ab750cf10024a6d700e5c4 AS base
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
FROM node:22-alpine@sha256:968df39aedcea65eeb078fb336ed7191baf48f972b4479711397108be0966920 AS runner
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
