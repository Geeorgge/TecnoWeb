# Design Patterns and Testing Implementation

## Overview
This document describes the design patterns and testing infrastructure implemented in the Techno Hogar backend.

## Implemented Design Patterns

### 1. Observer Pattern (EventEmitter)

**Purpose**: Decouple service creation from notification sending to improve maintainability and scalability.

**Implementation**:
- **Event Class**: `src/servicios/events/servicio-created.event.ts`
  - Simple event class that wraps the Servicio entity

- **Listener**: `src/common/listeners/notification.listener.ts`
  - Listens for `servicio.created` events
  - Handles Google Sheets and WhatsApp notifications asynchronously
  - Logs all notification activities

- **Service Update**: `src/servicios/servicios.service.ts`
  - Removed direct dependencies on GoogleSheetsService and WhatsAppService
  - Now only depends on EventEmitter2
  - Emits events instead of calling notification services directly

**Benefits**:
- **Separation of Concerns**: Business logic is separated from notification logic
- **Scalability**: Easy to add new notification channels without modifying the service
- **Testability**: Services can be tested without mocking notification services
- **Flexibility**: Notifications can be enabled/disabled without changing service code

**Example Usage**:
```typescript
// In servicios.service.ts
this.eventEmitter.emit(
  'servicio.created',
  new ServicioCreatedEvent(servicioConCliente),
);

// In notification.listener.ts
@OnEvent('servicio.created', { async: true })
async handleServicioCreated(event: ServicioCreatedEvent): Promise<void> {
  // Handle notifications
}
```

### 2. Profanity Filter (Custom Validator Pattern)

**Purpose**: Prevent inappropriate language in user-submitted content.

**Implementation**:
- **Validator**: `src/common/validators/profanity-filter.validator.ts`
  - Custom class-validator decorator
  - Maintains a list of prohibited words in Spanish
  - Uses word boundaries to avoid false positives
  - Case-insensitive matching

**Applied to**:
- `CreateServicioDto.marca`
- `CreateServicioDto.modelo`
- `CreateServicioDto.problema`
- `CreateServicioDto.ubicacionServicio`

**Example Usage**:
```typescript
@IsString()
@NoProfanity({ message: 'La descripción contiene lenguaje inapropiado' })
problema: string;
```

**Profanity List** (expandable):
- Common Spanish profanity words
- Uses regex with word boundaries (`\b`) to match whole words only
- Easy to extend by adding more words to the array

## Testing Infrastructure

### Jest Configuration

**File**: `jest.config.js`

**Settings**:
- Test files: `*.spec.ts`
- Coverage directory: `coverage/`
- Test environment: Node.js
- Transform: ts-jest for TypeScript support
- Coverage exclusions: modules, main.ts, index.ts

### Unit Tests

#### 1. ServiciosService Tests
**File**: `src/servicios/servicios.service.spec.ts`

**Test Coverage**:
- ✅ `create()` - Creating a servicio and emitting event
- ✅ `findAll()` - Fetching all servicios
- ✅ `findAll(estado)` - Filtering by estado
- ✅ `findOne()` - Finding a specific servicio
- ✅ `findOne()` - Throwing NotFoundException for non-existent servicio
- ✅ `update()` - Updating a servicio
- ✅ `remove()` - Removing a servicio
- ✅ `remove()` - Throwing NotFoundException when removing non-existent servicio
- ✅ `findByCliente()` - Finding servicios by cliente ID

**Test Results**: ✅ 8 tests passing

#### 2. Profanity Filter Tests
**File**: `src/common/validators/profanity-filter.validator.spec.ts`

**Test Coverage**:
- ✅ Clean text validation
- ✅ Empty text handling
- ✅ Profanity detection
- ✅ Case-insensitive matching
- ✅ Word boundary validation
- ✅ Profanity in longer sentences
- ✅ Default error message

**Test Results**: ✅ 8 tests passing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run tests with debugging
npm run test:debug
```

### Total Test Results

**Summary**:
- ✅ 16/16 tests passing
- ✅ 2/2 test suites passing
- ✅ 100% test success rate

## Architecture Improvements

### Before (Tightly Coupled)
```
ServiciosService
  ├─> GoogleSheetsService
  └─> WhatsAppService
```

### After (Loosely Coupled via Observer Pattern)
```
ServiciosService
  └─> EventEmitter2
        └─> NotificationListener
              ├─> GoogleSheetsService
              └─> WhatsAppService
```

## Future Improvements

### Recommended Next Steps:

1. **Strategy Pattern for Notifications**
   - Create `NotificationStrategy` interface
   - Implement `GoogleSheetsStrategy`, `WhatsAppStrategy`, `EmailStrategy`
   - Dynamically select strategies based on configuration

2. **Integration Tests**
   - Test complete request/response flows
   - Test database interactions
   - Test event emission and handling

3. **E2E Tests**
   - Test full user workflows
   - Test API endpoints with real database
   - Test error scenarios

4. **Increase Coverage**
   - Target: 70-80% code coverage
   - Add tests for controllers
   - Add tests for other services (ClientesService, etc.)

5. **CI/CD Integration**
   - Add GitHub Actions workflow
   - Run tests on every push/PR
   - Block merges if tests fail
   - Generate coverage reports

## Dependencies Added

```json
{
  "dependencies": {
    "@nestjs/event-emitter": "^3.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^10.4.20",
    "@types/jest": "^29.5.14",
    "jest": "^29.7.0",
    "ts-jest": "^29.4.6"
  }
}
```

## Best Practices Applied

1. ✅ **Separation of Concerns**: Business logic separated from cross-cutting concerns
2. ✅ **Single Responsibility**: Each class has one clear responsibility
3. ✅ **Open/Closed Principle**: Open for extension (new listeners), closed for modification
4. ✅ **Dependency Inversion**: Depend on abstractions (EventEmitter) not concretions
5. ✅ **Test-Driven Design**: Comprehensive unit tests for critical functionality
6. ✅ **Clean Code**: Clear naming, proper comments, consistent style
7. ✅ **Input Validation**: Multiple layers of validation including profanity filter

## Notes

- Tests run in Docker container: `docker exec techno-hogar-backend npm test`
- Event listeners run asynchronously to avoid blocking service creation
- Profanity filter can be easily extended with more words
- All notification errors are logged but don't fail the service creation
