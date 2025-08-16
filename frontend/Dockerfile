# Multi-stage Dockerfile that leverages yarn workspaces
FROM node:18-alpine AS base

# This Dockerfile is designed to be built with build args to specify which app to build
ARG APP_NAME
ARG PORT=3000

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy workspace configuration and all package.json files
COPY package.json yarn.lock* ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Create the directory structure for package.json files
RUN mkdir -p apps/citizen_app apps/department_app apps/admin_app packages/ui

# Copy individual package.json files to their correct locations
COPY apps/citizen_app/package.json ./apps/citizen_app/
COPY apps/department_app/package.json ./apps/department_app/
COPY apps/admin_app/package.json ./apps/admin_app/
COPY packages/ui/package.json ./packages/ui/

# Install dependencies for the entire workspace (this gives us the workspace advantage!)
RUN yarn install --frozen-lockfile

# Build stage
FROM deps AS builder
WORKDIR /app

# Copy all workspace source code
COPY packages/ ./packages/
COPY apps/ ./apps/

# Build the specific app
RUN yarn workspace ${APP_NAME} build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=${PORT}

# Copy workspace package.json and yarn.lock
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

# Copy the built app
COPY --from=builder /app/apps/${APP_NAME}/.next ./apps/${APP_NAME}/.next
COPY --from=builder /app/apps/${APP_NAME}/package.json ./apps/${APP_NAME}/
COPY --from=builder /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

# Copy shared packages
COPY --from=builder /app/packages ./packages

# Copy only production node_modules (includes all workspace dependencies)
COPY --from=builder /app/node_modules ./node_modules

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE ${PORT}

# Use workspace command to start
CMD yarn workspace ${APP_NAME} start
