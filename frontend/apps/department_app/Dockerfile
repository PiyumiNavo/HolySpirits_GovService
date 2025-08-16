# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy workspace configuration
COPY package.json yarn.lock ./
COPY apps/department_app/package.json ./apps/department_app/
COPY packages/ui/package.json ./packages/ui/

# Install all dependencies (this handles the monorepo correctly)
RUN yarn install --frozen-lockfile

# Build the department app
FROM deps AS app-builder
WORKDIR /app

# Copy the shared UI package
COPY packages/ui ./packages/ui

# Copy the department app
COPY apps/department_app ./apps/department_app

# Build the app (this will also compile the UI package references)
RUN yarn workspace department_app build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002

# Copy the built application
COPY --from=app-builder /app/apps/department_app/.next ./apps/department_app/.next
COPY --from=app-builder /app/apps/department_app/package.json ./apps/department_app/
COPY --from=app-builder /app/apps/department_app/public ./apps/department_app/public

# Copy workspace files
COPY --from=app-builder /app/package.json ./
COPY --from=app-builder /app/yarn.lock ./

# Copy UI package
COPY --from=app-builder /app/packages/ui ./packages/ui

# Copy node_modules with all dependencies
COPY --from=app-builder /app/node_modules ./node_modules

EXPOSE 3002

# Use the workspace command to start the app
CMD ["yarn", "workspace", "department_app", "start"]
