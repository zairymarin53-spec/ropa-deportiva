export type ProductCategory =
  | 'Running'
  | 'Entrenamiento'
  | 'Ciclismo'
  | 'Trail & Accesorios';

export type GarmentSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type FitCut = 'Dama' | 'Caballero';
export type GenderLine = 'Dama' | 'Caballero' | 'Dama y Caballero';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  genderLine: GenderLine;
  availableFits: FitCut[];
  price: number;
  weightSpec: string;
  availability: string;
  colorName: string;
  material: string;
  fit: string;
  description: string;
  features: string[];
  sizes: GarmentSize[];
  image: string;
}

export interface GalleryFrame {
  id: string;
  title: string;
  context: 'Dama' | 'Caballero' | 'Taller & Confección';
  caption: string;
  detailSpec: string;
  image: string;
  linkedProductId?: string;
}

export interface ApparelService {
  id: string;
  number: string;
  title: string;
  turnaround: string;
  pricingNote: string;
  summary: string;
  deliverables: string[];
  contactReason:
    | 'Equipación de Club / Equipo'
    | 'Pedido Personalizado'
    | 'Servicio de Taller / Ajuste'
    | 'Asesoría de Talla y Tejido';
}

export const HERO_IMAGE =
  '/src/assets/images/hero_athletic_runner_1794921110727.jpg';

export const WORKSHOP_IMAGE =
  '/src/assets/images/editorial_taller_confeccion_1794921114407.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'conjunto-dama-running',
    sku: 'CAD-DM-01',
    name: 'Set Short Tiro Alto & Chaqueta Ligera Dama',
    category: 'Running',
    genderLine: 'Dama',
    availableFits: ['Dama'],
    price: 114.0,
    weightSpec: '110 g/m²',
    availability: 'En stock',
    colorName: 'Obsidiana / Pizarra',
    material: 'Microfibra bi-elástica 86% · Elastano 14% · Acabado repelente',
    fit: 'Patronaje femenino · Cintura anatómica de tiro alto',
    description:
      'Conjunto de dos piezas diseñado específicamente para corredoras: short con cintura ancha sin presión abdominal y bolsillo trasero con cierre, acompañado de chaqueta ligera cortavientos.',
    features: [
      'Cintura alta anatómica que permanece firme durante zancadas rápidas',
      'Bolsillo lateral y posterior con cierre oculto para llaves y teléfono',
      'Chaqueta respirable de cuello alto y puños elásticos suaves',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_conjunto_dama_running_1794921399577.jpg',
  },
  {
    id: 'top-dama-seamless',
    sku: 'CAD-DM-04',
    name: 'Kit Top Alto Soporte & Manga Larga Seamless Dama',
    category: 'Entrenamiento',
    genderLine: 'Dama',
    availableFits: ['Dama'],
    price: 79.0,
    weightSpec: '165 g/m²',
    availability: 'En stock',
    colorName: 'Grafito / Azul Cobalto',
    material: 'Poliamida seamless 78% · Elastano de alta recuperación 22%',
    fit: 'Soporte alto femenino · Espalda atlética',
    description:
      'Dúo de entrenamiento sin costuras laterales compuesto por top deportivo de alto impacto con banda inferior estable y camiseta térmica ligera de ventilación mapeada.',
    features: [
      'Sujeción firme para carrera, saltos y entrenamiento funcional intenso',
      'Espalda deportiva transpirable que facilita la movilidad escapular',
      'Tejido seamless libre de costuras internas irritantes',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image: '/src/assets/images/prod_top_dama_tecnico_1794921399396.jpg',
  },
  {
    id: 'chaqueta-cortavientos-aero',
    sku: 'CAD-RN-01',
    name: 'Chaqueta Cortavientos Aero Ripstop',
    category: 'Running',
    genderLine: 'Dama y Caballero',
    availableFits: ['Dama', 'Caballero'],
    price: 118.0,
    weightSpec: '98 g/m²',
    availability: 'En stock',
    colorName: 'Carbón Mate / Cobalto',
    material: 'Poliamida ripstop reciclada 92% · Elastano 8% · Tratamiento DWR',
    fit: 'Disponible en corte anatómico Dama y Caballero',
    description:
      'Cortavientos ultraligero disponible en moldería específica para dama y caballero. Incluye cremallera sellada repelente al agua, bolsillo pectoral y ventilación dorsal cortada con láser.',
    features: [
      'Resistencia al viento y lluvia ligera sin sacrificar transpirabilidad',
      'Costuras planas selladas en hombros y axilas para evitar rozaduras',
      'Empacable en su propio bolsillo pectoral para transporte rápido',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_chaqueta_aero_1794921110718.jpg',
  },
  {
    id: 'camiseta-tecnica-microperforada',
    sku: 'CAD-CB-04',
    name: 'Camiseta Técnica Microperforada Caballero',
    category: 'Entrenamiento',
    genderLine: 'Caballero',
    availableFits: ['Caballero'],
    price: 58.0,
    weightSpec: '125 g/m²',
    availability: 'En stock',
    colorName: 'Grafito Pizarra',
    material: 'Poliéster técnico hidrofílico 88% · Elastano 12%',
    fit: 'Patronaje masculino · Hombro articulado',
    description:
      'Prenda base masculina de secado ultrarrápido con mapeo corporal de zonas de ventilación en espalda y torso. Evacua la humedad durante sesiones de fuerza e intervalos.',
    features: [
      'Zonas de malla abierta integradas sin costuras laterales',
      'Tratamiento antibacteriano de larga duración sin metales pesados',
      'Cuello reforzado indeformable de perfil bajo',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_camiseta_compresion_1794921110762.jpg',
  },
  {
    id: 'shorts-split-velocidad',
    sku: 'CAD-CB-07',
    name: 'Shorts Split Velocidad 5" Caballero',
    category: 'Running',
    genderLine: 'Caballero',
    availableFits: ['Caballero'],
    price: 64.0,
    weightSpec: '105 g/m²',
    availability: 'En stock',
    colorName: 'Ceniza Mineral',
    material: 'Microfibra elástica 4 direcciones 86% · Spandex 14%',
    fit: 'Corte masculino · Entrepierna 5" con abertura lateral',
    description:
      'Pantalón corto de competición para caballero con dobladillo termosellado y cintura plana de sujeción estable. Incorpora bolsillo lateral con cremallera invisible sin rebote.',
    features: [
      'Forro interior anatómico de malla ultrafina sin costuras frontales',
      'Bolsillo trasero y lateral con cierre para nutrición y llave',
      'Bajos cortados por ultrasonido para reducir peso y fricción',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_shorts_pro_1794921110783.jpg',
  },
  {
    id: 'maillot-ruta-cobalto',
    sku: 'CAD-CY-02',
    name: 'Maillot Ruta Aerodinámico Cobalto',
    category: 'Ciclismo',
    genderLine: 'Dama y Caballero',
    availableFits: ['Dama', 'Caballero'],
    price: 94.0,
    weightSpec: '135 g/m²',
    availability: 'En stock',
    colorName: 'Azul Cobalto / Negro',
    material: 'Tejido italiano bi-elástico UPF 50+ · Mangas corte limpio',
    fit: 'Corte Pro Race específico Dama y Caballero',
    description:
      'Maillot de ciclismo confeccionado en patronaje femenino y masculino para reducir resistencia al aire. Cuenta con tres bolsillos dorsales reforzados y banda de silicona hipoalergénica.',
    features: [
      'Cremallera frontal YKK de bloqueo automático con protector superior',
      'Tres bolsillos traseros antideslizantes + cuarto bolsillo impermeable',
      'Detalle reflectante trasero de alta visibilidad en ruta',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_maillot_ciclismo_1794921112452.jpg',
  },
  {
    id: 'mallas-compresion-termicas',
    sku: 'CAD-TR-09',
    name: 'Mallas Compresión Ergonómicas',
    category: 'Entrenamiento',
    genderLine: 'Dama y Caballero',
    availableFits: ['Dama', 'Caballero'],
    price: 86.0,
    weightSpec: '220 g/m²',
    availability: 'En stock',
    colorName: 'Obsidiana',
    material: 'Poliamida de alta densidad 74% · Lycra Sport 26%',
    fit: 'Compresión graduada · Moldería Dama o Caballero',
    description:
      'Mallas largas de entrenamiento y recuperación con paneles anatómicos diferenciados para dama (cintura alta) y caballero (tiro deportivo). Uniones con costura plana de cuatro agujas.',
    features: [
      'Cintura ergonómica que mantiene la posición en sentadillas y sprints',
      'Tejido opaco de alta recuperación elástica en cuatro direcciones',
      'Costuras articuladas que acompañan la biomecánica de la rodilla',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_leggings_termicos_1794921112541.jpg',
  },
  {
    id: 'chaleco-hidratacion-trail',
    sku: 'CAD-AC-03',
    name: 'Kit Chaleco Trail 12L & Mochila Técnica',
    category: 'Trail & Accesorios',
    genderLine: 'Dama y Caballero',
    availableFits: ['Dama', 'Caballero'],
    price: 112.0,
    weightSpec: '195 g totales',
    availability: 'Últimas unidades',
    colorName: 'Gris Técnico Ripstop',
    material: 'Malla 3D transpirable · Nylon ripstop impermeable',
    fit: 'Ajuste pectoral regulable para torso femenino o masculino',
    description:
      'Sistema modular de hidratación y carga con arnés regulable para torso de dama o caballero. Incluye dos bidones blandos frontales de 500 ml y mochila estanca de respaldo.',
    features: [
      'Dos compartimentos frontales para bidones blandos de 500 ml incluidos',
      'Fijación elástica trasera para bastones de trail sin rebote',
      'Compartimento principal roll-top resistente a lluvia intensa',
    ],
    sizes: ['S', 'M', 'L'],
    image: '/src/assets/images/prod_mochila_trail_1794921112290.jpg',
  },
];

export const GALLERY_FRAMES: GalleryFrame[] = [
  {
    id: 'gal-1',
    title: 'Conjunto Pista Amanecer',
    context: 'Caballero',
    caption:
      'Chaqueta Aero Ripstop y Shorts Split en rodaje de ritmo controlado sobre pista de concreto.',
    detailSpec: 'Tejido DWR 98 g/m² · Protección eólica frontal',
    image: HERO_IMAGE,
    linkedProductId: 'chaqueta-cortavientos-aero',
  },
  {
    id: 'gal-2',
    title: 'Conjunto Running Dama Tiro Alto',
    context: 'Dama',
    caption:
      'Short anatómico femenino con bolsillo sellado y chaqueta ligera respirable en tonos grafito.',
    detailSpec: 'Microfibra 110 g/m² · Cintura estable sin compresión excesiva',
    image: '/src/assets/images/prod_conjunto_dama_running_1794921399577.jpg',
    linkedProductId: 'conjunto-dama-running',
  },
  {
    id: 'gal-3',
    title: 'Top Alto Soporte & Seamless Dama',
    context: 'Dama',
    caption:
      'Tejido sin costuras con mapeo de transpirabilidad en espalda y sujeción de alto impacto.',
    detailSpec: 'Poliamida Seamless 165 g/m² · Cero rozaduras',
    image: '/src/assets/images/prod_top_dama_tecnico_1794921399396.jpg',
    linkedProductId: 'top-dama-seamless',
  },
  {
    id: 'gal-4',
    title: 'Maillot Ruta Cobalto Dama y Caballero',
    context: 'Caballero',
    caption:
      'Patronaje aerodinámico disponible en corte femenino y masculino con mangas de corte láser.',
    detailSpec: 'UPF 50+ · 3 bolsillos dorsales reforzados',
    image: '/src/assets/images/prod_maillot_ciclismo_1794921112452.jpg',
    linkedProductId: 'maillot-ruta-cobalto',
  },
  {
    id: 'gal-5',
    title: 'Arquitectura de Compresión',
    context: 'Dama',
    caption:
      'Costuras ergonómicas de cuatro agujas diseñadas para estabilizar cuádriceps e isquiotibiales.',
    detailSpec: 'Lycra Sport 220 g/m² · Opacidad total',
    image: '/src/assets/images/prod_leggings_termicos_1794921112541.jpg',
    linkedProductId: 'mallas-compresion-termicas',
  },
  {
    id: 'gal-6',
    title: 'Confección en Taller Propio',
    context: 'Taller & Confección',
    caption:
      'Patronaje independiente para dama y caballero ensamblado con máquina flatlock industrial.',
    detailSpec: 'Control de calidad pieza por pieza · Lotes desde 10 u.',
    image: WORKSHOP_IMAGE,
  },
];

export const APPAREL_SERVICES: ApparelService[] = [
  {
    id: 'srv-equipos',
    number: '01',
    title: 'Confección a Medida para Clubes (Dama y Caballero)',
    turnaround: 'Entrega en 12 a 15 días hábiles',
    pricingNote: 'Desde $42.00 / conjunto (mínimo 10 unidades)',
    summary:
      'Desarrollamos equipaciones completas con patronaje diferenciado para rama femenina y masculina en clubes de atletismo, ciclismo y entrenamiento funcional.',
    deliverables: [
      'Curva completa de tallas XS a XL en corte dama y caballero',
      'Muestrario físico de ajuste antes de iniciar producción',
      'Reposiciones unitarias disponibles durante todo el año',
    ],
    contactReason: 'Equipación de Club / Equipo',
  },
  {
    id: 'srv-sublimacion',
    number: '02',
    title: 'Sublimación y Estampado Técnico de Alta Duración',
    turnaround: 'Entrega en 5 a 7 días hábiles',
    pricingNote: 'Desde $14.00 / prenda sobre catálogo',
    summary:
      'Personalización de dorsales, escudos, nombres de atletas y patrocinadores mediante tintas de penetración directa que no obstruyen la ventilación del tejido.',
    deliverables: [
      'Transfer reflectante nocturno de alta adherencia',
      'Sublimación integral sin grietas tras lavados intensivos',
      'Previsualización digital de ubicaciones incluida',
    ],
    contactReason: 'Pedido Personalizado',
  },
  {
    id: 'srv-ajustes',
    number: '03',
    title: 'Ajuste Ergonómico y Reparación Técnica',
    turnaround: 'Entrega en 48 a 72 horas',
    pricingNote: 'Tarifa por intervención desde $12.00',
    summary:
      'Servicio de taller especializado en ropa deportiva para dama y caballero: ajuste de largos en mallas y chaquetas, reemplazo de cremalleras selladas y refuerzo de costuras.',
    deliverables: [
      'Costura flatlock original compatible con tejidos elásticos',
      'Sustitución de cierres impermeables y tiradores',
      'Termosellado de dobladillos sin puntadas visibles',
    ],
    contactReason: 'Servicio de Taller / Ajuste',
  },
  {
    id: 'srv-asesoria',
    number: '04',
    title: 'Asesoría de Tallaje Femenino, Masculino y Tejidos',
    turnaround: 'Respuesta en menos de 4 horas',
    pricingNote: 'Servicio sin costo adicional',
    summary:
      'Te orientamos para elegir el corte (dama o caballero), la talla exacta y la combinación térmica adecuada según tu disciplina y anatomía.',
    deliverables: [
      'Tabla comparativa real de pecho, cintura, cadera y entrepierna',
      'Recomendación por capas para clima frío, templado o húmedo',
      'Cambio de talla o corte ágil con recolección a domicilio',
    ],
    contactReason: 'Asesoría de Talla y Tejido',
  },
];

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
