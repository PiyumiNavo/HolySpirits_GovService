# apps/citizen_app/Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy workspace configuration
COPY package.json yarn.lock ./
COPY apps/citizen_app/package.json ./apps/citizen_app/
COPY packages/ui/package.json ./packages/ui/

# Install all dependencies (this handles the monorepo correctly)
RUN yarn install --frozen-lockfile

# Build the citizen app
FROM deps AS app-builder
WORKDIR /app

# Copy the shared UI package
COPY packages/ui ./packages/ui

# Copy the citizen app
COPY apps/citizen_app ./apps/citizen_app

# Build the app (this will also compile the UI package references)
RUN yarn workspace citizen_app build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy the built application
COPY --from=app-builder /app/apps/citizen_app/.next ./apps/citizen_app/.next
COPY --from=app-builder /app/apps/citizen_app/package.json ./apps/citizen_app/
COPY --from=app-builder /app/apps/citizen_app/public ./apps/citizen_app/public

# Copy workspace files
COPY --from=app-builder /app/package.json ./
COPY --from=app-builder /app/yarn.lock ./

# Copy UI package
COPY --from=app-builder /app/packages/ui ./packages/ui

# Copy node_modules with all dependencies
COPY --from=app-builder /app/node_modules ./node_modules

EXPOSE 3001

# Use the workspace command to start the app
CMD ["yarn", "workspace", "citizen_app", "start"]
