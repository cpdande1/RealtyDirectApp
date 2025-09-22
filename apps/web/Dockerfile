# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
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
RUN npm run build --workspace=@repo/ui

# Verify lib package is built and check node_modules
RUN ls -la packages/lib/dist/
RUN ls -la node_modules/@realtydirect/
RUN ls -la node_modules/@realtydirect/lib/

# Try to build using turbo to ensure proper dependency resolution
RUN npx turbo build --filter=web --verbose

# Production image with nginx
FROM nginx:alpine AS runner

# Copy built application
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Add health check endpoint
RUN echo '<!DOCTYPE html><html><body><h1>OK</h1></body></html>' > /usr/share/nginx/html/health.html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health.html || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

