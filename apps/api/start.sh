#!/bin/bash

# Production startup script for RealtyDirect API
set -e

echo "🚀 Starting RealtyDirect API..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
until pg_isready -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USER; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "✅ Database is ready!"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Start the application
echo "🎉 Starting application..."
exec node dist/main.js
