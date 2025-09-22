# RealtyDirect Deployment Guide

This guide will help you deploy RealtyDirect to production.

## 🚀 Quick Deployment

### Prerequisites

1. **Server Requirements**
   - Ubuntu 20.04+ or similar Linux distribution
   - Docker and Docker Compose installed
   - At least 4GB RAM, 2 CPU cores
   - 20GB+ disk space

2. **Domain & SSL**
   - Domain name pointing to your server
   - SSL certificate (Let's Encrypt recommended)

3. **External Services**
   - AWS S3 bucket for file storage
   - SendGrid account for emails
   - Stripe account for payments
   - RECO/External API keys

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Step 2: Clone and Configure

```bash
# Clone repository
git clone <your-repo-url>
cd realtydirect

# Copy environment configuration
cp env.production .env

# Edit environment variables
nano .env
```

### Step 3: Configure Environment Variables

Update `.env` with your production values:

```bash
# Database
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=realtydirect_prod

# JWT Secret (generate a secure random string)
JWT_SECRET=your_64_character_secret_key_here

# AWS S3
AWS_S3_BUCKET=your-production-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# External APIs
STRIPE_SECRET_KEY=sk_live_your_stripe_key
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=noreply@yourdomain.com

# URLs
FRONTEND_URL=https://yourdomain.com
API_URL=https://yourdomain.com/api
```

### Step 4: Deploy

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🔧 Manual Deployment

If you prefer manual deployment:

```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# Run database migrations
docker-compose -f docker-compose.prod.yml exec api npx prisma migrate deploy

# Check service health
docker-compose -f docker-compose.prod.yml ps
```

## 🌐 Domain and SSL Setup

### Option 1: Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates to project
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem
sudo chown $USER:$USER ./ssl/*.pem

# Set up auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Cloudflare SSL

1. Point your domain to Cloudflare
2. Enable SSL/TLS encryption
3. Use Cloudflare's origin certificates

## 📊 Monitoring and Maintenance

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f api
docker-compose -f docker-compose.prod.yml logs -f web
```

### Backup Database

```bash
# Create backup
docker-compose -f docker-compose.prod.yml exec db pg_dump -U realtydirect realtydirect_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker-compose -f docker-compose.prod.yml exec -T db psql -U realtydirect realtydirect_prod < backup_file.sql
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# Run migrations if needed
docker-compose -f docker-compose.prod.yml exec api npx prisma migrate deploy
```

## 🔒 Security Considerations

### 1. Firewall Setup

```bash
# Configure UFW
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Environment Security

- Use strong, unique passwords
- Rotate API keys regularly
- Enable 2FA on all external service accounts
- Monitor access logs

### 3. Database Security

- Use strong database passwords
- Enable SSL for database connections
- Regular security updates

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   sudo lsof -i :80
   # Kill process
   sudo kill -9 <PID>
   ```

2. **Database Connection Failed**
   ```bash
   # Check database logs
   docker-compose -f docker-compose.prod.yml logs db
   # Restart database
   docker-compose -f docker-compose.prod.yml restart db
   ```

3. **SSL Certificate Issues**
   ```bash
   # Check certificate validity
   openssl x509 -in ssl/cert.pem -text -noout
   # Renew certificate
   sudo certbot renew
   ```

### Health Checks

```bash
# Check all services
curl http://localhost/health
curl http://localhost:3001/health
curl http://localhost:3000/health.html

# Check database
docker-compose -f docker-compose.prod.yml exec db pg_isready

# Check Redis
docker-compose -f docker-compose.prod.yml exec redis redis-cli ping
```

## 📈 Performance Optimization

### 1. Database Optimization

```bash
# Monitor database performance
docker-compose -f docker-compose.prod.yml exec db psql -U realtydirect -d realtydirect_prod -c "SELECT * FROM pg_stat_activity;"
```

### 2. Caching

- Redis is already configured for caching
- Enable CDN for static assets
- Use browser caching headers

### 3. Scaling

For high traffic, consider:
- Load balancer (nginx/haproxy)
- Database read replicas
- Redis cluster
- Container orchestration (Kubernetes)

## 🔄 CI/CD Pipeline

Set up automated deployment with GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        run: |
          ssh user@yourdomain.com 'cd /path/to/realtydirect && git pull && ./deploy.sh'
```

## 📞 Support

For deployment issues:
1. Check logs: `docker-compose -f docker-compose.prod.yml logs`
2. Verify environment variables
3. Check service health endpoints
4. Review this deployment guide

---

**RealtyDirect** - Production deployment made simple! 🚀

