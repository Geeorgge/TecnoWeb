import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Bienvenido a Tecno Hogar API',
      version: '1.0.0',
      endpoints: {
        clientes: '/api/clientes',
        servicios: '/api/servicios',
        health: '/api/health',
      },
    };
  }
}
