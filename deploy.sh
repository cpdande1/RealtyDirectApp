#!/bin/bash

# RealtyDirect Deployment Script
set -e

echo "🚀 Starting RealtyDirect deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please copy env.production to .env and configure it."
    exit 1
fi

# Load environment variables
source .env

# Check required environment variables
required_vars=("JWT_SECRET" "POSTGRES_PASSWORD" "AWS_S3_BUCKET" "FRONTEND_URL" "API_URL")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set"
        exit 1
    fi
done

echo "✅ Environment variables validated"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans

# Pull latest images
echo "📥 Pulling latest images..."
docker-compose -f docker-compose.prod.yml pull

# Build and start services
echo "🔨 Building and starting services..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check service health
echo "🔍 Checking service health..."

# Check database
if ! docker-compose -f docker-compose.prod.yml exec -T db pg_isready -U $POSTGRES_USER -d $POSTGRES_DB; then
    echo "❌ Database is not ready"
    exit 1
fi

# Check Redis
if ! docker-compose -f docker-compose.prod.yml exec -T redis redis-cli ping; then
    echo "❌ Redis is not ready"
    exit 1
fi

# Check API
if ! curl -f http://localhost:3001/health; then
    echo "❌ API is not ready"
    exit 1
fi

# Check Web
if ! curl -f http://localhost:3000/health.html; then
    echo "❌ Web app is not ready"
    exit 1
fi

echo "✅ All services are healthy!"

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T api npx prisma migrate deploy

echo "🎉 Deployment completed successfully!"
echo ""
echo "📊 Service Status:"
echo "  - Database: http://localhost:5432"
echo "  - Redis: http://localhost:6379"
echo "  - API: http://localhost:3001"
echo "  - Web App: http://localhost:3000"
echo "  - API Docs: http://localhost:3001/api/docs"
echo ""
echo "🔧 Management Commands:"
echo "  - View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  - Stop services: docker-compose -f docker-compose.prod.yml down"
echo "  - Restart services: docker-compose -f docker-compose.prod.yml restart"
echo ""
echo "🌐 Next Steps:"
echo "  1. Set up your domain DNS to point to this server"
echo "  2. Configure SSL certificates"
echo "  3. Set up monitoring and backups"
