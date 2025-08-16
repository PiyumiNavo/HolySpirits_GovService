FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json files for all workspaces
COPY package.json ./
COPY packages/ui/package.json ./packages/ui/
COPY apps/admin_app/package.json ./apps/admin_app/

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
WORKDIR /app/apps/admin_app
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/apps/admin_app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin_app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin_app/.next/static ./.next/static

USER nextjs

EXPOSE 3003

ENV PORT=3003
# Set hostname to localhost
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/admin_app/server.js"]
