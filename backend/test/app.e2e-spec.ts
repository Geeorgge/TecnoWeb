import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply same validation pipe as in main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.setGlobalPrefix('api');

    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('/ (GET) - should return server info', () => {
      return request(app.getHttpServer())
        .get('/api')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('environment');
        });
    });
  });

  describe('Clientes API', () => {
    let createdClienteId: number;

    it('/api/clientes (POST) - should create a new cliente', () => {
      return request(app.getHttpServer())
        .post('/api/clientes')
        .send({
          nombre: 'Test Cliente E2E',
          telefono: '8449998877',
          email: 'test.e2e@example.com',
          direccion: 'Calle Test 123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.nombre).toBe('Test Cliente E2E');
          expect(res.body.telefono).toBe('8449998877');
          createdClienteId = res.body.id;
        });
    });

    it('/api/clientes (GET) - should return all clientes', () => {
      return request(app.getHttpServer())
        .get('/api/clientes')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('/api/clientes/:id (GET) - should return a specific cliente', () => {
      return request(app.getHttpServer())
        .get(`/api/clientes/${createdClienteId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdClienteId);
          expect(res.body.nombre).toBe('Test Cliente E2E');
        });
    });

    it('/api/clientes/:id (PATCH) - should update a cliente', () => {
      return request(app.getHttpServer())
        .patch(`/api/clientes/${createdClienteId}`)
        .send({
          nombre: 'Test Cliente E2E Updated',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.nombre).toBe('Test Cliente E2E Updated');
        });
    });

    it('/api/clientes/999999 (GET) - should return 404 for non-existent cliente', () => {
      return request(app.getHttpServer())
        .get('/api/clientes/999999')
        .expect(404);
    });
  });

  describe('Servicios API', () => {
    let clienteId: number;
    let servicioId: number;

    beforeAll(async () => {
      // Create a cliente for testing servicios
      const response = await request(app.getHttpServer())
        .post('/api/clientes')
        .send({
          nombre: 'Cliente para Servicio',
          telefono: '8447776655',
          email: 'servicio.test@example.com',
          direccion: 'Av Servicio 456',
        });
      clienteId = response.body.id;
    });

    it('/api/servicios (POST) - should create a new servicio', () => {
      return request(app.getHttpServer())
        .post('/api/servicios')
        .send({
          clienteId: clienteId,
          tipoElectrodomestico: 'REFRIGERADOR',
          marca: 'Samsung',
          modelo: 'RF28R7201SR',
          problema: 'No enfría correctamente',
          urgencia: 'ALTA',
          ubicacionServicio: 'Cocina',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.tipoElectrodomestico).toBe('REFRIGERADOR');
          expect(res.body.problema).toBe('No enfría correctamente');
          servicioId = res.body.id;
        });
    });

    it('/api/servicios (POST) - should reject profanity in problema field', () => {
      return request(app.getHttpServer())
        .post('/api/servicios')
        .send({
          clienteId: clienteId,
          tipoElectrodomestico: 'REFRIGERADOR',
          problema: 'Esta mierda no funciona',
          urgencia: 'ALTA',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('lenguaje inapropiado');
        });
    });

    it('/api/servicios (POST) - should reject profanity in marca field', () => {
      return request(app.getHttpServer())
        .post('/api/servicios')
        .send({
          clienteId: clienteId,
          tipoElectrodomestico: 'REFRIGERADOR',
          marca: 'pinche marca',
          problema: 'No funciona',
          urgencia: 'ALTA',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('lenguaje inapropiado');
        });
    });

    it('/api/servicios (GET) - should return all servicios', () => {
      return request(app.getHttpServer())
        .get('/api/servicios')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('/api/servicios?estado=PENDIENTE (GET) - should filter by estado', () => {
      return request(app.getHttpServer())
        .get('/api/servicios?estado=PENDIENTE')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          res.body.forEach((servicio) => {
            expect(servicio.estado).toBe('PENDIENTE');
          });
        });
    });

    it('/api/servicios/:id (GET) - should return a specific servicio', () => {
      return request(app.getHttpServer())
        .get(`/api/servicios/${servicioId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(servicioId);
          expect(res.body).toHaveProperty('cliente');
        });
    });

    it('/api/servicios/:id (PATCH) - should update a servicio', () => {
      return request(app.getHttpServer())
        .patch(`/api/servicios/${servicioId}`)
        .send({
          estado: 'EN_PROCESO',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.estado).toBe('EN_PROCESO');
        });
    });

    it('/api/servicios/cliente/:clienteId (GET) - should return servicios by cliente', () => {
      return request(app.getHttpServer())
        .get(`/api/servicios/cliente/${clienteId}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          res.body.forEach((servicio) => {
            expect(servicio.clienteId).toBe(clienteId);
          });
        });
    });

    it('/api/servicios/999999 (GET) - should return 404 for non-existent servicio', () => {
      return request(app.getHttpServer())
        .get('/api/servicios/999999')
        .expect(404);
    });
  });

  describe('Validation', () => {
    it('should reject invalid email format', () => {
      return request(app.getHttpServer())
        .post('/api/clientes')
        .send({
          nombre: 'Test',
          telefono: '8441234567',
          email: 'invalid-email',
          direccion: 'Test',
        })
        .expect(400);
    });

    it('should reject invalid phone format', () => {
      return request(app.getHttpServer())
        .post('/api/clientes')
        .send({
          nombre: 'Test',
          telefono: '123', // Too short
          email: 'test@example.com',
          direccion: 'Test',
        })
        .expect(400);
    });

    it('should reject invalid tipoElectrodomestico', () => {
      return request(app.getHttpServer())
        .post('/api/servicios')
        .send({
          clienteId: 1,
          tipoElectrodomestico: 'INVALID_TYPE',
          problema: 'Test problem',
        })
        .expect(400);
    });

    it('should reject missing required fields', () => {
      return request(app.getHttpServer())
        .post('/api/servicios')
        .send({
          tipoElectrodomestico: 'REFRIGERADOR',
          // Missing clienteId and problema
        })
        .expect(400);
    });
  });
});
