#!/bin/bash

# Cloud Deployment Script for RealtyDirect
set -e

echo "☁️ RealtyDirect Cloud Deployment Options"
echo "========================================"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please initialize git first."
    exit 1
fi

echo ""
echo "Choose your deployment platform:"
echo "1. Railway (Recommended for full-stack apps)"
echo "2. Vercel (Frontend only)"
echo "3. Render (Full-stack with database)"
echo "4. DigitalOcean App Platform"
echo "5. AWS (Manual setup required)"
echo "6. Exit"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo "🚂 Deploying to Railway..."
        echo ""
        echo "Steps to deploy on Railway:"
        echo "1. Go to https://railway.app"
        echo "2. Sign up/Login with GitHub"
        echo "3. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "4. Select your RealtyDirect repository"
        echo "5. Railway will automatically detect and deploy"
        echo ""
        echo "Required Environment Variables:"
        echo "- DATABASE_URL (Railway will provide PostgreSQL)"
        echo "- JWT_SECRET (generate a secure random string)"
        echo "- AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY"
        echo "- STRIPE_SECRET_KEY, SENDGRID_API_KEY"
        echo ""
        echo "🔗 Railway Dashboard: https://railway.app/dashboard"
        ;;
    2)
        echo "▲ Deploying to Vercel..."
        echo ""
        echo "Steps to deploy on Vercel:"
        echo "1. Install Vercel CLI: npm i -g vercel"
        echo "2. Run: cd apps/web && vercel"
        echo "3. Follow the prompts"
        echo ""
        echo "Note: This deploys only the frontend. You'll need to deploy the API separately."
        echo "🔗 Vercel Dashboard: https://vercel.com/dashboard"
        ;;
    3)
        echo "🎨 Deploying to Render..."
        echo ""
        echo "Steps to deploy on Render:"
        echo "1. Go to https://render.com"
        echo "2. Sign up/Login with GitHub"
        echo "3. Create a new Web Service"
        echo "4. Connect your GitHub repository"
        echo "5. Configure build settings:"
        echo "   - Build Command: npm run build"
        echo "   - Start Command: npm run start:prod"
        echo "   - Environment: Node"
        echo ""
        echo "🔗 Render Dashboard: https://dashboard.render.com"
        ;;
    4)
        echo "🌊 Deploying to DigitalOcean App Platform..."
        echo ""
        echo "Steps to deploy on DigitalOcean:"
        echo "1. Go to https://cloud.digitalocean.com/apps"
        echo "2. Click 'Create App'"
        echo "3. Connect your GitHub repository"
        echo "4. Configure services:"
        echo "   - Web Service (API)"
        echo "   - Static Site (Frontend)"
        echo "   - Database (PostgreSQL)"
        echo ""
        echo "🔗 DigitalOcean Dashboard: https://cloud.digitalocean.com/apps"
        ;;
    5)
        echo "☁️ AWS Deployment..."
        echo ""
        echo "AWS deployment requires manual setup. See DEPLOYMENT.md for detailed instructions."
        echo "Recommended AWS services:"
        echo "- ECS or EC2 for containers"
        echo "- RDS for PostgreSQL"
        echo "- ElastiCache for Redis"
        echo "- S3 for file storage"
        echo "- CloudFront for CDN"
        echo ""
        echo "🔗 AWS Console: https://console.aws.amazon.com"
        ;;
    6)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "📚 Additional Resources:"
echo "- Deployment Guide: ./DEPLOYMENT.md"
echo "- Environment Variables: ./env.production"
echo "- Docker Configuration: ./docker-compose.prod.yml"
echo ""
echo "🔧 After deployment:"
echo "1. Set up your domain DNS"
echo "2. Configure SSL certificates"
echo "3. Set up monitoring and backups"
echo "4. Test all functionality"
echo ""
echo "🎉 Happy deploying!"
