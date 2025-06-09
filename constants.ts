import { Product } from './types';

// These category and type names should match the initial state in App.tsx
export const INITIAL_CATEGORIES_ES = [
  "Kits de Robótica",
  "Controladores",
  "Sensores",
  "Motores",
  "Chasis",
  "Accesorios"
];

export const INITIAL_PRODUCT_TYPES_ES = ["Kit", "Pieza"];


export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kit de Robot Avanzado',
    description: 'Un kit completo para construir robots avanzados con múltiples sensores y actuadores.',
    price: 750.00, // Example price in S/.
    category: INITIAL_CATEGORIES_ES[0], // "Kits de Robótica"
    imageUrl: 'https://picsum.photos/seed/robotkit1/400/300',
    type: INITIAL_PRODUCT_TYPES_ES[0], // "Kit"
  },
  {
    id: '2',
    name: 'Placa Microcontroladora MK1',
    description: 'Potente microcontrolador para proyectos de robótica, con WiFi y Bluetooth.',
    price: 120.00,
    category: INITIAL_CATEGORIES_ES[1], // "Controladores"
    imageUrl: 'https://picsum.photos/seed/controller1/400/300',
    type: INITIAL_PRODUCT_TYPES_ES[1], // "Pieza"
  },
  {
    id: '3',
    name: 'Sensor Ultrasónico de Distancia',
    description: 'Sensor de alta precisión para detectar obstáculos y medir distancias.',
    price: 40.00,
    category: INITIAL_CATEGORIES_ES[2], // "Sensores"
    imageUrl: 'https://picsum.photos/seed/sensor1/400/300',
    type: INITIAL_PRODUCT_TYPES_ES[1], // "Pieza"
  },
  {
    id: '4',
    name: 'Servomotor de Alto Torque',
    description: 'Servomotor confiable para movimientos precisos en brazos robóticos y pinzas.',
    price: 65.00,
    category: INITIAL_CATEGORIES_ES[3], // "Motores"
    imageUrl: 'https://picsum.photos/seed/motor1/400/300',
    type: INITIAL_PRODUCT_TYPES_ES[1], // "Pieza"
  },
  {
    id: '5',
    name: 'Chasis de Aluminio para Robot',
    description: 'Chasis de aluminio duradero y ligero para construcciones de robots personalizadas.',
    price: 180.00,
    category: INITIAL_CATEGORIES_ES[4], // "Chasis"
    imageUrl: 'https://picsum.photos/seed/chassis1/400/300',
    type: INITIAL_PRODUCT_TYPES_ES[1], // "Pieza"
  },
  {
    id: '6',
    name: 'Kit de Cables Jumper',
    description: 'Cables jumper surtidos para protoboard y conexión de componentes.',
    price: 30.00,
    category: INITIAL_CATEGORIES_ES[5], // "Accesorios"
    imageUrl: 'https://picsum.photos/seed/wires1/400/300',
    type: INITIAL_PRODUCT_TYPES_ES[1], // "Pieza"
  },
  {
    id: '7',
    name: 'Kit de Auto Robot para Principiantes',
    description: 'Un kit de auto robot fácil de ensamblar, perfecto para principiantes que aprenden robótica y programación.',
    price: 300.00,
    category: INITIAL_CATEGORIES_ES[0], // "Kits de Robótica"
    imageUrl: 'https://picsum.photos/seed/robotkit2/400/300',
    type: INITIAL_PRODUCT_TYPES_ES[0], // "Kit"
  },
  {
    id: '8',
    name: 'Sensor Seguidor de Línea Infrarrojo',
    description: 'Array de sensores para construir robots seguidores de línea.',
    price: 50.00,
    category: INITIAL_CATEGORIES_ES[2], // "Sensores"
    imageUrl: 'https://picsum.photos/seed/sensor2/400/300',
    type: INITIAL_PRODUCT_TYPES_ES[1], // "Pieza"
  }
];