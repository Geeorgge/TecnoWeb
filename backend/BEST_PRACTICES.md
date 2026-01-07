# Best Practices & Code Conventions

## Code Quality Standards

### 1. TypeScript

#### Use Strict Types
```typescript
// ✅ Good
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad
function calculateTotal(items: any): any {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

#### Prefer Interfaces over Types for Objects
```typescript
// ✅ Good
interface User {
  id: number;
  name: string;
  email: string;
}

// ⚠️ Acceptable but prefer interface
type User = {
  id: number;
  name: string;
  email: string;
};
```

### 2. NestJS Architecture

#### Use Dependency Injection
```typescript
// ✅ Good
@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
    private eventEmitter: EventEmitter2,
  ) {}
}

// ❌ Bad - Direct instantiation
export class ServiciosService {
  private servicioRepository = new ServicioRepository();
}
```

#### Follow Module Pattern
```typescript
// ✅ Good - Organize by feature
src/
  servicios/
    ├── dto/
    ├── entities/
    ├── events/
    ├── servicios.controller.ts
    ├── servicios.service.ts
    └── servicios.module.ts
```

### 3. Error Handling

#### Use Built-in HTTP Exceptions
```typescript
// ✅ Good
import { NotFoundException } from '@nestjs/common';

async findOne(id: number): Promise<Servicio> {
  const servicio = await this.servicioRepository.findOne({ where: { id } });

  if (!servicio) {
    throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
  }

  return servicio;
}

// ❌ Bad - Generic error
async findOne(id: number): Promise<Servicio> {
  const servicio = await this.servicioRepository.findOne({ where: { id } });

  if (!servicio) {
    throw new Error('Not found');
  }

  return servicio;
}
```

#### Log Errors Appropriately
```typescript
// ✅ Good
try {
  await this.googleSheetsService.appendRow(data);
  this.logger.log(`Google Sheets updated for service ID: ${servicio.id}`);
} catch (error) {
  this.logger.error('Error saving to Google Sheets:', error);
  // Don't throw - allow process to continue
}

// ❌ Bad - Silent failure
try {
  await this.googleSheetsService.appendRow(data);
} catch (error) {
  // Silent failure
}
```

### 4. Validation

#### Use class-validator Decorators
```typescript
// ✅ Good
export class CreateServicioDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID del cliente es obligatorio' })
  clienteId: number;

  @IsString()
  @IsNotEmpty({ message: 'La descripción del problema es obligatoria' })
  @NoProfanity({ message: 'La descripción contiene lenguaje inapropiado' })
  problema: string;
}
```

#### Validate Early
```typescript
// ✅ Good - Validation at DTO level
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);

// ❌ Bad - Manual validation in service
if (!createServicioDto.clienteId) {
  throw new BadRequestException('Client ID is required');
}
```

### 5. Database Operations

#### Use Query Builder for Complex Queries
```typescript
// ✅ Good
async findAll(estado?: EstadoServicio): Promise<Servicio[]> {
  const queryBuilder = this.servicioRepository
    .createQueryBuilder('servicio')
    .leftJoinAndSelect('servicio.cliente', 'cliente')
    .orderBy('servicio.fechaPreferida', 'ASC');

  if (estado) {
    queryBuilder.where('servicio.estado = :estado', { estado });
  }

  return await queryBuilder.getMany();
}
```

#### Always Load Required Relations
```typescript
// ✅ Good
const servicio = await this.servicioRepository.findOne({
  where: { id },
  relations: ['cliente'],
});

// ⚠️ Warning - Missing relations might cause errors later
const servicio = await this.servicioRepository.findOne({
  where: { id },
});
```

### 6. Event-Driven Architecture

#### Use Events for Cross-Cutting Concerns
```typescript
// ✅ Good - Emit event
this.eventEmitter.emit(
  'servicio.created',
  new ServicioCreatedEvent(servicioConCliente),
);

// ❌ Bad - Direct coupling
await this.googleSheetsService.appendRow(data);
await this.whatsAppService.sendNotification(data);
await this.emailService.sendEmail(data);
```

#### Make Event Listeners Async
```typescript
// ✅ Good
@OnEvent('servicio.created', { async: true })
async handleServicioCreated(event: ServicioCreatedEvent): Promise<void> {
  // Async processing won't block the main flow
}
```

### 7. Testing

#### Write Descriptive Test Names
```typescript
// ✅ Good
it('should throw NotFoundException when servicio not found', async () => {
  mockRepository.findOne.mockResolvedValue(null);
  await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
});

// ❌ Bad
it('test findOne', async () => {
  // ...
});
```

#### Mock External Dependencies
```typescript
// ✅ Good
const mockGoogleSheetsService = {
  appendRow: jest.fn(),
};

// ❌ Bad - Using real service in unit test
const googleSheetsService = new GoogleSheetsService();
```

#### Test Edge Cases
```typescript
// ✅ Good - Test multiple scenarios
describe('findOne', () => {
  it('should return a servicio when found', async () => { /* ... */ });
  it('should throw NotFoundException when not found', async () => { /* ... */ });
  it('should load cliente relation', async () => { /* ... */ });
});
```

### 8. Security

#### Never Expose Sensitive Data
```typescript
// ✅ Good
@Injectable()
export class GoogleSheetsService {
  private readonly credentials = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}',
  );
}

// ❌ Bad - Hardcoded credentials
const credentials = {
  client_email: "service@project.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\n..."
};
```

#### Validate and Sanitize User Input
```typescript
// ✅ Good
@IsString()
@NoProfanity({ message: 'La descripción contiene lenguaje inapropiado' })
problema: string;

// ⚠️ Warning - No validation
problema: string;
```

### 9. Logging

#### Use Appropriate Log Levels
```typescript
// ✅ Good
this.logger.log('Service created successfully');
this.logger.warn('Google Sheets is disabled');
this.logger.error('Error saving to database', error);
this.logger.debug('Processing servicio ID: 123');

// ❌ Bad - Everything as log
this.logger.log('Warning: disabled');
this.logger.log('Error occurred');
```

#### Include Context in Logs
```typescript
// ✅ Good
this.logger.log(`WhatsApp sent for service ID: ${servicio.id}`);

// ⚠️ Less helpful
this.logger.log('WhatsApp sent');
```

### 10. Code Organization

#### Keep Files Focused and Small
```typescript
// ✅ Good - Single responsibility
// servicio-created.event.ts
export class ServicioCreatedEvent {
  constructor(public readonly servicio: Servicio) {}
}

// notification.listener.ts
@Injectable()
export class NotificationListener {
  @OnEvent('servicio.created')
  async handleServicioCreated(event: ServicioCreatedEvent) { /* ... */ }
}
```

#### Use Barrel Exports
```typescript
// ✅ Good - index.ts
export * from './servicio.entity';
export * from './cliente.entity';

// Import
import { Servicio, Cliente } from './entities';
```

### 11. Comments and Documentation

#### Write Self-Documenting Code
```typescript
// ✅ Good - Clear naming
const servicioConCliente = await this.servicioRepository.findOne({
  where: { id: savedServicio.id },
  relations: ['cliente'],
});

// ❌ Bad - Needs comment to explain
// Get the servicio with cliente
const result = await this.repo.findOne({
  where: { id: saved.id },
  relations: ['c'],
});
```

#### Add Comments for Complex Logic
```typescript
// ✅ Good
// Use word boundaries to avoid false positives
// e.g., "carabina" contains "carajo" but should be valid
const regex = new RegExp(`\\b${word}\\b`, 'i');
return regex.test(normalizedText);
```

### 12. Environment Configuration

#### Use Environment Variables
```typescript
// ✅ Good
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST || 'localhost';

// ❌ Bad - Hardcoded values
const port = 3000;
const dbHost = 'localhost';
```

#### Validate Required Environment Variables
```typescript
// ✅ Good
if (process.env.GOOGLE_SHEETS_ENABLED === 'true') {
  if (!process.env.GOOGLE_SPREADSHEET_ID) {
    throw new Error('GOOGLE_SPREADSHEET_ID is required when Google Sheets is enabled');
  }
  this.initializeAuth();
}
```

## Performance Best Practices

### 1. Database Queries
- Use indexes on frequently queried columns
- Avoid N+1 queries by using eager loading
- Use pagination for large result sets

### 2. Async Operations
- Don't block on non-critical operations
- Use events for fire-and-forget operations
- Implement proper error handling for async code

### 3. Caching
- Cache frequently accessed data
- Use proper cache invalidation strategies
- Consider Redis for distributed caching

## Git Commit Conventions

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(servicios): add Observer Pattern for notifications

Implemented EventEmitter to decouple notification logic from
service creation. This improves maintainability and allows
easy addition of new notification channels.

BREAKING CHANGE: ServiciosService no longer directly depends
on GoogleSheetsService and WhatsAppService
```

## Code Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] All functions have proper type annotations
- [ ] Error handling is implemented
- [ ] Tests are written and passing
- [ ] No sensitive data in code
- [ ] Environment variables are used for configuration
- [ ] Logging is appropriate and helpful
- [ ] Code is self-documenting with minimal comments
- [ ] No code duplication
- [ ] Performance considerations addressed

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeORM Documentation](https://typeorm.io/)
- [Jest Testing Guide](https://jestjs.io/docs/getting-started)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)
