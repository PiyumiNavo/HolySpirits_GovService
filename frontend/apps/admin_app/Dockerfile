# Use a Node.js base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json yarn.lock ./
COPY apps/citizen_app/package.json ./apps/citizen_app/
COPY packages/ui/package.json ./packages/ui/

RUN yarn install --frozen-lockfile

# Build
FROM deps AS builder
WORKDIR /app
COPY . . 
RUN yarn workspace citizen_app build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/apps/citizen_app/.next ./.next
COPY --from=builder /app/apps/citizen_app/package.json ./ 
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/ui ./packages/ui

EXPOSE 3001
CMD ["yarn", "workspace", "citizen_app", "start"]
