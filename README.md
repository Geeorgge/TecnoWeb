# 🔧 Techno Hogar - Technical Service Management System

Complete web system for managing appliance repair service requests. Includes public website, admin panel, Google Sheets integration, and WhatsApp notifications.

[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![Tests](https://img.shields.io/badge/Tests-Passing-success?logo=jest)](https://jestjs.io/)
[![Coverage](https://img.shields.io/badge/Coverage-Check_CI-blue?logo=codecov)](https://codecov.io/)

## Technologies

### Backend
- **NestJS** - Node.js framework with TypeScript
- **TypeORM** - ORM for MySQL
- **MySQL** - Relational database
- **Docker** - Containers for development and production

### Frontend
- **React** - UI library with Hooks
- **TypeScript** - Static typing
- **Vite** - Modern and fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - SPA navigation
- **React Hook Form** - Form management
- **Axios** - HTTP client

## Project Structure

```
TecnoWeb/
├── backend/                    # REST API with NestJS
│   ├── src/
│   │   ├── clientes/          # Clients module
│   │   ├── servicios/         # Services module
│   │   ├── config/            # Database configuration
│   │   ├── app.module.ts      # Main module
│   │   └── main.ts            # Entry point
│   ├── database/
│   │   └── init.sql           # DB initialization script
│   ├── Dockerfile
│   └── package.json
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # App pages
│   │   ├── services/          # API services
│   │   ├── types/             # TypeScript definitions
│   │   ├── App.tsx            # Root component
│   │   └── main.tsx           # Entry point
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml          # Container orchestration
├── Tech/                       # Legacy PHP code (do not touch)
└── README.md
```

## Quick Start

### Prerequisites
- **Docker** and **Docker Compose** installed
- **Node.js 18+** (only for local development without Docker)
- **Git** for version control

### Option 1: With Docker (Recommended)

This is the fastest way to run the complete project:

```bash
# 1. Clone repository and switch to modernization branch
git checkout modernizacion

# 2. Start all services (first time may take a while)
docker-compose up

# Or in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Available URLs:**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/api/health
- **MySQL:** localhost:3306

**MySQL Credentials:**
- Host: `localhost`
- Port: `3306`
- User: `techno_user`
- Password: `techno_password`
- Database: `techno_hogar`

### Option 2: Local Development (without Docker)

#### 1. Backend

```bash
cd backend

# Install dependencies
npm install

# Make sure you have MySQL running locally
# Create database 'techno_hogar'

# Configure .env with your local MySQL credentials
cp .env.example .env
# Edit .env according to your configuration

# Run in development mode
npm run start:dev

# Backend will be at http://localhost:3000
```

#### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run in development mode
npm run dev

# Frontend will be at http://localhost:5173
```

## Testing

### Running Tests

```bash
# Run all tests
docker exec techno-hogar-backend npm test

# Run tests with coverage
docker exec techno-hogar-backend npm run test:cov

# Run tests in watch mode
docker exec techno-hogar-backend npm run test:watch

# Run E2E tests
docker exec techno-hogar-backend npm run test:e2e
```

### Test Coverage

The project includes:
- ✅ **Unit Tests** - Unit tests for services and validators
- ✅ **Integration Tests** - Integration tests for listeners
- ✅ **E2E Tests** - End-to-end tests for API endpoints
- ✅ **Profanity Filter Tests** - Validation of prohibited words filter

**Test files:**
- [servicios.service.spec.ts](backend/src/servicios/servicios.service.spec.ts) - Main service tests
- [profanity-filter.validator.spec.ts](backend/src/common/validators/profanity-filter.validator.spec.ts) - Profanity validator tests
- [notification.listener.spec.ts](backend/src/common/listeners/notification.listener.spec.ts) - Notification listener tests
- [google-sheets.service.spec.ts](backend/src/common/services/google-sheets.service.spec.ts) - Google Sheets tests
- [whatsapp.service.spec.ts](backend/src/common/services/whatsapp.service.spec.ts) - WhatsApp tests
- [app.e2e-spec.ts](backend/test/app.e2e-spec.ts) - API E2E tests

### CI/CD

The project includes GitHub Actions to run tests automatically on every push or pull request:
- ✅ Unit and integration tests
- ✅ Code coverage verification (minimum 50%)
- ✅ Code linting
- ✅ Application build

See: [.github/workflows/backend-tests.yml](.github/workflows/backend-tests.yml)

## Features

### Implemented ✅
- ✅ Technical service request form
- ✅ Complete client management (CRUD)
- ✅ Appliance registration with type, brand, and model
- ✅ Appointment scheduling with preferred date
- ✅ Urgency levels (Low, Medium, High)
- ✅ Complete REST API with validations
- ✅ Modern and responsive interface
- ✅ TypeScript in frontend and backend
- ✅ Docker containers for easy deployment

### Recently Completed ✅
- ✅ Complete admin panel
- ✅ Authentication system for administrators
- ✅ Dashboard with real-time statistics
- ✅ Google Sheets integration (automatic registration with professional formatting)
- ✅ WhatsApp notifications (CallMeBot/Twilio)
- ✅ Modern responsive design with cyan/teal scheme
- ✅ **Observer Pattern** - EventEmitter for decoupled notifications
- ✅ **Profanity Filter** - Inappropriate content validation in forms
- ✅ **Unit and E2E Tests** - Test coverage for critical services
- ✅ **CI/CD with GitHub Actions** - Automatic tests on every push/PR

### Coming Soon 🚧
- 🚧 Calendar system for scheduling appointments
- 🚧 Gallery of completed work
- 🚧 WhatsApp bot with conversational AI
- 🚧 Billing system
- 🚧 Privacy Policy and Terms page
- 🚧 Advanced reports and statistics

## API Endpoints

### Clients
```
POST   /api/clientes              - Create new client
GET    /api/clientes              - List all clients
GET    /api/clientes?search=...   - Search clients
GET    /api/clientes/:id          - Get client by ID
PATCH  /api/clientes/:id          - Update client
DELETE /api/clientes/:id          - Delete client
```

### Services
```
POST   /api/servicios                  - Create new service request
GET    /api/servicios                  - List all services
GET    /api/servicios?estado=...       - Filter by status
GET    /api/servicios/:id              - Get service by ID
GET    /api/servicios/cliente/:id      - Services for a client
PATCH  /api/servicios/:id              - Update service
DELETE /api/servicios/:id              - Delete service
```

### Health Check
```
GET    /api                - API information
GET    /api/health         - Service status
```

## Data Models

### Client
```typescript
{
  id: number
  nombre: string
  telefono: string
  email?: string
  direccion?: string
  createdAt: Date
  updatedAt: Date
}
```

### Service
```typescript
{
  id: number
  clienteId: number
  tipoElectrodomestico: 'lavadora' | 'secadora' | 'refrigerador' | 'congelador' | 'otro'
  marca?: string
  modelo?: string
  problema: string
  fechaPreferida?: Date
  ubicacionServicio?: string
  urgencia: 'baja' | 'media' | 'alta'
  estado: 'pendiente' | 'programado' | 'en_proceso' | 'completado' | 'cancelado'
  notasTecnico?: string
  costoEstimado?: number
  costoFinal?: number
  createdAt: Date
  updatedAt: Date
}
```

## Useful Commands

### Docker
```bash
# View active containers
docker ps

# View logs for a specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# Restart a service
docker-compose restart backend

# Rebuild containers (after dependency changes)
docker-compose up --build

# Clean everything and start from scratch
docker-compose down -v
docker-compose up --build
```

### Backend
```bash
# Run tests
npm run test

# Generate production build
npm run build

# Run in production
npm run start:prod

# Linting
npm run lint
```

### Frontend
```bash
# Production build
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## Migration from Legacy Code

The original PHP code is located in the `Tech/` folder and **should NOT be modified**. This new system is on the `modernizacion` branch and completely replaces the previous functionality with modern technologies.

### Main differences:
- ❌ **Before:** Monolithic PHP with mixed logic and presentation
- ✅ **Now:** REST API separated from frontend (decoupled architecture)

- ❌ **Before:** Bootstrap 3 + jQuery
- ✅ **Now:** React + TailwindCSS

- ❌ **Before:** Login/registration system
- ✅ **Now:** Service request form (no user authentication)

- ❌ **Before:** MySQL with direct queries
- ✅ **Now:** TypeORM with entities and migrations

## Production Deployment

### Using Docker Compose

```bash
# 1. Configure production environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with production values

# 2. Build and run in production mode
docker-compose -f docker-compose.yml up -d --build

# 3. Verify everything is running
docker-compose ps
```

### Important Environment Variables

**Backend (.env):**
```env
NODE_ENV=production
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=techno_user
DB_PASSWORD=CHANGE_IN_PRODUCTION
DB_DATABASE=techno_hogar
PORT=3000
CORS_ORIGIN=https://your-domain.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://api.your-domain.com/api
```

## Contributing

This is a private Techno Hogar project. To contribute:

1. Create a new branch from `modernizacion`
2. Make changes
3. Commit with descriptive messages
4. Create Pull Request for review

## Support

For questions or issues:
- Email: premium026@gmail.com

## License

Private project - Techno Hogar © 2026