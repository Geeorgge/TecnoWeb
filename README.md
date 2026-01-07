# 🔧 Techno Hogar - Sistema de Gestión de Servicios Técnicos

Sistema web completo para la gestión de solicitudes de servicio técnico de reparación de electrodomésticos. Incluye sitio web público, panel de administración, integración con Google Sheets y notificaciones por WhatsApp.

[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![Tests](https://img.shields.io/badge/Tests-Passing-success?logo=jest)](https://jestjs.io/)
[![Coverage](https://img.shields.io/badge/Coverage-Check_CI-blue?logo=codecov)](https://codecov.io/)

## Tecnologías

### Backend
- **NestJS** - Framework Node.js con TypeScript
- **TypeORM** - ORM para MySQL
- **MySQL** - Base de datos relacional
- **Docker** - Contenedores para desarrollo y producción

### Frontend
- **React** - Librería UI con Hooks
- **TypeScript** - Tipado estático
- **Vite** - Build tool moderno y rápido
- **TailwindCSS** - Framework CSS utility-first
- **React Router** - Navegación SPA
- **React Hook Form** - Manejo de formularios
- **Axios** - Cliente HTTP

## Estructura del Proyecto

```
TecnoWeb/
├── backend/                    # API REST con NestJS
│   ├── src/
│   │   ├── clientes/          # Módulo de clientes
│   │   ├── servicios/         # Módulo de servicios
│   │   ├── config/            # Configuración de base de datos
│   │   ├── app.module.ts      # Módulo principal
│   │   └── main.ts            # Punto de entrada
│   ├── database/
│   │   └── init.sql           # Script de inicialización de BD
│   ├── Dockerfile
│   └── package.json
├── frontend/                   # Aplicación React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Páginas de la app
│   │   ├── services/          # Servicios API
│   │   ├── types/             # Definiciones TypeScript
│   │   ├── App.tsx            # Componente raíz
│   │   └── main.tsx           # Punto de entrada
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml          # Orquestación de contenedores
├── Tech/                       # Código legacy PHP (no tocar)
└── README.md
```

## Inicio Rápido

### Prerrequisitos
- **Docker** y **Docker Compose** instalados
- **Node.js 18+** (solo para desarrollo local sin Docker)
- **Git** para control de versiones

### Opción 1: Con Docker (Recomendado)

Esta es la forma más rápida de ejecutar el proyecto completo:

```bash
# 1. Clonar el repositorio y cambiar a la rama de modernización
git checkout modernizacion

# 2. Iniciar todos los servicios (primera vez puede tardar)
docker-compose up

# O en modo detached (segundo plano)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

**URLs disponibles:**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/api/health
- **MySQL:** localhost:3306

**Credenciales de MySQL:**
- Host: `localhost`
- Puerto: `3306`
- Usuario: `techno_user`
- Password: `techno_password`
- Base de datos: `techno_hogar`

### Opción 2: Desarrollo Local (sin Docker)

#### 1. Backend

```bash
cd backend

# Instalar dependencias
npm install

# Asegurarse de tener MySQL corriendo localmente
# Crear base de datos 'techno_hogar'

# Configurar .env con tus credenciales de MySQL local
cp .env.example .env
# Editar .env según tu configuración

# Ejecutar en modo desarrollo
npm run start:dev

# El backend estará en http://localhost:3000
```

#### 2. Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El frontend estará en http://localhost:5173
```

## Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
docker exec techno-hogar-backend npm test

# Ejecutar tests con cobertura
docker exec techno-hogar-backend npm run test:cov

# Ejecutar tests en modo watch
docker exec techno-hogar-backend npm run test:watch

# Ejecutar tests E2E
docker exec techno-hogar-backend npm run test:e2e
```

### Cobertura de Tests

El proyecto incluye:
- ✅ **Unit Tests** - Tests unitarios para servicios y validadores
- ✅ **Integration Tests** - Tests de integración para listeners
- ✅ **E2E Tests** - Tests end-to-end para endpoints de API
- ✅ **Profanity Filter Tests** - Validación de filtro de palabras prohibidas

**Archivos de test:**
- [servicios.service.spec.ts](backend/src/servicios/servicios.service.spec.ts) - Tests del servicio principal
- [profanity-filter.validator.spec.ts](backend/src/common/validators/profanity-filter.validator.spec.ts) - Tests del validador de profanidad
- [notification.listener.spec.ts](backend/src/common/listeners/notification.listener.spec.ts) - Tests del listener de notificaciones
- [google-sheets.service.spec.ts](backend/src/common/services/google-sheets.service.spec.ts) - Tests de Google Sheets
- [whatsapp.service.spec.ts](backend/src/common/services/whatsapp.service.spec.ts) - Tests de WhatsApp
- [app.e2e-spec.ts](backend/test/app.e2e-spec.ts) - Tests E2E de la API

### CI/CD

El proyecto incluye GitHub Actions para ejecutar tests automáticamente en cada push o pull request:
- ✅ Tests unitarios y de integración
- ✅ Verificación de cobertura de código (mínimo 50%)
- ✅ Linting del código
- ✅ Build de la aplicación

Ver: [.github/workflows/backend-tests.yml](.github/workflows/backend-tests.yml)

## Funcionalidades

### Implementadas ✅
- ✅ Formulario de solicitud de servicio técnico
- ✅ Gestión completa de clientes (CRUD)
- ✅ Registro de electrodomésticos con tipo, marca y modelo
- ✅ Programación de citas con fecha preferida
- ✅ Niveles de urgencia (Baja, Media, Alta)
- ✅ API REST completa con validaciones
- ✅ Interfaz moderna y responsive
- ✅ TypeScript en frontend y backend
- ✅ Contenedores Docker para fácil despliegue

### Completadas Recientemente ✅
- ✅ Panel de administración completo
- ✅ Sistema de autenticación para administradores
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Integración con Google Sheets (registro automático con formato profesional)
- ✅ Notificaciones por WhatsApp (CallMeBot/Twilio)
- ✅ Diseño responsive moderno con esquema cyan/teal
- ✅ **Observer Pattern** - EventEmitter para notificaciones desacopladas
- ✅ **Filtro de Profanidad** - Validación de contenido inapropiado en formularios
- ✅ **Tests Unitarios y E2E** - Cobertura de tests para servicios críticos
- ✅ **CI/CD con GitHub Actions** - Tests automáticos en cada push/PR

### Próximamente 🚧
- 🚧 Sistema de calendario para agendar citas
- 🚧 Galería de trabajos realizados
- 🚧 Bot de WhatsApp con IA conversacional
- 🚧 Sistema de facturación
- 🚧 Página de Política de Privacidad y Términos
- 🚧 Reportes y estadísticas avanzadas

## API Endpoints

### Clientes
```
POST   /api/clientes              - Crear nuevo cliente
GET    /api/clientes              - Listar todos los clientes
GET    /api/clientes?search=...   - Buscar clientes
GET    /api/clientes/:id          - Obtener cliente por ID
PATCH  /api/clientes/:id          - Actualizar cliente
DELETE /api/clientes/:id          - Eliminar cliente
```

### Servicios
```
POST   /api/servicios                  - Crear nueva solicitud de servicio
GET    /api/servicios                  - Listar todos los servicios
GET    /api/servicios?estado=...       - Filtrar por estado
GET    /api/servicios/:id              - Obtener servicio por ID
GET    /api/servicios/cliente/:id      - Servicios de un cliente
PATCH  /api/servicios/:id              - Actualizar servicio
DELETE /api/servicios/:id              - Eliminar servicio
```

### Health Check
```
GET    /api                - Información de la API
GET    /api/health         - Estado del servicio
```

## Modelos de Datos

### Cliente
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

### Servicio
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

## Comandos Útiles

### Docker
```bash
# Ver contenedores activos
docker ps

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# Reiniciar un servicio
docker-compose restart backend

# Reconstruir contenedores (después de cambios en dependencias)
docker-compose up --build

# Limpiar todo y empezar de cero
docker-compose down -v
docker-compose up --build
```

### Backend
```bash
# Ejecutar tests
npm run test

# Generar build de producción
npm run build

# Ejecutar en producción
npm run start:prod

# Linting
npm run lint
```

### Frontend
```bash
# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Migración desde el Código Legacy

El código PHP original se encuentra en la carpeta `Tech/` y **NO debe modificarse**. Este nuevo sistema está en la rama `modernizacion` y reemplaza completamente la funcionalidad anterior con tecnologías modernas.

### Diferencias principales:
- ❌ **Antes:** PHP monolítico con mezcla de lógica y presentación
- ✅ **Ahora:** API REST separada del frontend (arquitectura desacoplada)

- ❌ **Antes:** Bootstrap 3 + jQuery
- ✅ **Ahora:** React + TailwindCSS

- ❌ **Antes:** Sistema de login/registro
- ✅ **Ahora:** Formulario de solicitud de servicio (sin autenticación de usuarios)

- ❌ **Antes:** MySQL con consultas directas
- ✅ **Ahora:** TypeORM con entidades y migraciones

## Despliegue a Producción

### Usando Docker Compose

```bash
# 1. Configurar variables de entorno de producción
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Editar los archivos .env con valores de producción

# 2. Construir y ejecutar en modo producción
docker-compose -f docker-compose.yml up -d --build

# 3. Verificar que todo esté corriendo
docker-compose ps
```

### Variables de Entorno Importantes

**Backend (.env):**
```env
NODE_ENV=production
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=techno_user
DB_PASSWORD=CAMBIAR_EN_PRODUCCION
DB_DATABASE=techno_hogar
PORT=3000
CORS_ORIGIN=https://tu-dominio.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://api.tu-dominio.com/api
```

## Contribución

Este es un proyecto privado de Techno Hogar. Para contribuir:

1. Crear una nueva rama desde `modernizacion`
2. Realizar cambios
3. Hacer commit con mensajes descriptivos
4. Crear Pull Request para revisión

## Soporte

Para dudas o problemas:
- Email: premium026@gmail.com

## Licencia

Proyecto privado - Techno Hogar © 2026
