# RealtyDirect - Self-Service Real Estate Marketplace

A comprehensive real estate marketplace where buyers and sellers manage transactions end-to-end.

## 🏗️ Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + NestJS + TypeScript
- **Mobile**: React Native + Expo
- **Database**: PostgreSQL + Redis
- **Infrastructure**: Docker + Turborepo

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose

### Setup
```bash
# Clone and install
git clone <repository-url>
cd realtydirect
npm install

# Environment setup
cp env.example .env
# Edit .env with your configuration

# Start database
docker-compose up -d

# Setup database
cd apps/api
npx prisma generate
npx prisma db push

# Start development
npm run dev
```

## 📋 Available Scripts

- `npm run dev` - Start all services
- `npm run dev:web` - Frontend only
- `npm run dev:api` - Backend only
- `npm run build` - Build all apps
- `npm run test` - Run tests

## 🎯 Features Implemented

✅ **Authentication System**
- User registration/login with JWT
- Role-based access control
- 2FA support

✅ **Listings Management**
- CRUD operations for properties
- Image upload support
- Address management

✅ **API Infrastructure**
- NestJS with Swagger docs
- Input validation
- Rate limiting

✅ **Frontend Foundation**
- React + Vite setup
- Tailwind CSS styling
- Responsive design

## 🔧 Development

- API docs: http://localhost:3001/api/docs
- Web app: http://localhost:3000
- Database GUI: `npx prisma studio`

## 📁 Project Structure

```
realtydirect/
├── apps/
│   ├── web/           # React frontend
│   ├── api/           # NestJS backend
│   └── mobile/        # React Native app
├── packages/
│   ├── lib/           # Shared types/utils
│   ├── ui/            # UI components
│   └── ai/            # AI modules
└── docker-compose.yml # Local development
```

## 🚧 Next Steps

- File upload to AWS S3
- Document generation
- Cost calculator
- Transaction workflow
- E-signature integration

## 📄 License

MIT License