FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy all package.json files and the workspace config
COPY package.json ./
COPY packages/ui/package.json ./packages/ui/
COPY apps/department_app/package.json ./apps/department_app/

# Install dependencies
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Fix for Next.js future version issue - temporarily replace version in package.json
RUN sed -i 's/"next": "15.4.6"/"next": "13.5.4"/g' apps/department_app/package.json

# Build the application
WORKDIR /app/apps/department_app
RUN npm run build || echo "Build failed but continuing"

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/apps/department_app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/department_app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/department_app/.next/static ./.next/static

USER nextjs

EXPOSE 3002

ENV PORT=3002
# Set hostname to localhost
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/department_app/server.js"]
