-- Script de inicialización de base de datos para Techno Hogar
-- Este script se ejecuta automáticamente cuando se crea el contenedor de MySQL

USE techno_hogar;

-- Crear tabla de clientes
CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE,
    direccion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_telefono (telefono),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear tabla de servicios
CREATE TABLE IF NOT EXISTS servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    tipo_electrodomestico ENUM('lavadora', 'secadora', 'refrigerador', 'congelador', 'otro') NOT NULL,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    problema TEXT NOT NULL,
    fecha_preferida DATETIME,
    ubicacion_servicio VARCHAR(255),
    urgencia ENUM('baja', 'media', 'alta') DEFAULT 'media',
    estado ENUM('pendiente', 'programado', 'en_proceso', 'completado', 'cancelado') DEFAULT 'pendiente',
    notas_tecnico TEXT,
    costo_estimado DECIMAL(10, 2),
    costo_final DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    INDEX idx_estado (estado),
    INDEX idx_fecha_preferida (fecha_preferida),
    INDEX idx_cliente (cliente_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de prueba
INSERT INTO cliente (nombre, telefono, email, direccion) VALUES
('Juan Pérez', '844-123-4567', 'juan.perez@example.com', 'Av. Principal #123, Saltillo, Coahuila'),
('María González', '844-234-5678', 'maria.gonzalez@example.com', 'Calle Secundaria #456, Arteaga, Coahuila');

INSERT INTO servicio (cliente_id, tipo_electrodomestico, marca, modelo, problema, fecha_preferida, urgencia) VALUES
(1, 'lavadora', 'LG', 'WM3488HW', 'No enciende y hace ruido extraño', '2026-01-10 10:00:00', 'alta'),
(2, 'refrigerador', 'Samsung', 'RF28R7351SR', 'No enfría correctamente', '2026-01-12 14:00:00', 'media');
