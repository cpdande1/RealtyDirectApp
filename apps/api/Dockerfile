# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/*/package*.json ./packages/*/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Build the application
FROM base AS builder
WORKDIR /app

# Copy all source code
COPY . .

# Install all dependencies and ensure workspace linking
RUN npm install

# Build packages in correct order
RUN npm run build --workspace=@realtydirect/lib
RUN npm run build --workspace=@realtydirect/ai

# Verify packages are built and check node_modules
RUN ls -la packages/lib/dist/
RUN ls -la packages/ai/dist/
RUN ls -la node_modules/@realtydirect/
RUN ls -la node_modules/@realtydirect/lib/
RUN ls -la node_modules/@realtydirect/ai/

# Build API using turbo to ensure proper dependency resolution
RUN npx turbo build --filter=api --verbose

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package*.json ./
COPY --from=builder --chown=nestjs:nodejs /app/packages/lib/dist ./node_modules/@realtydirect/lib/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/ai/dist ./node_modules/@realtydirect/ai/dist

# Copy Prisma schema
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./prisma

# Install Prisma CLI
RUN npm install -g prisma

# Set user
USER nestjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]

