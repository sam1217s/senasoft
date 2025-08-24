require('dotenv').config();
const mongoose = require('mongoose');
const Centro = require('../models/Centro');
const Programa = require('../models/Programa');
const Instructor = require('../models/Instructor');
const Aprendiz = require('../models/Aprendiz');

const departamentosColombia = [
  'Antioquia', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá',
  'Caldas', 'Caquetá', 'Cauca', 'César', 'Córdoba',
  'Cundinamarca', 'Huila', 'La Guajira', 'Magdalena', 'Meta',
  'Nariño', 'Norte de Santander', 'Quindío', 'Risaralda', 'Santander',
  'Sucre', 'Tolima', 'Valle del Cauca'
];

const nombresAprendices = [
  'Ana María', 'Carlos Andrés', 'Diana Patricia', 'Eduardo José',
  'Fernanda', 'Gabriel', 'Helena', 'Iván', 'Juliana', 'Kevin',
  'Laura', 'Miguel', 'Natalia', 'Oscar', 'Paola', 'Roberto',
  'Sara', 'Tomás', 'Valentina', 'William'
];

const apellidos = [
  'García', 'Rodríguez', 'González', 'Hernández', 'López',
  'Martínez', 'Pérez', 'Sánchez', 'Ramírez', 'Cruz',
  'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz',
  'Reyes', 'Morales', 'Jiménez', 'Álvarez', 'Vargas'
];

async function limpiarBaseDatos() {
  console.log('🧹 Limpiando base de datos...');
  await Centro.deleteMany({});
  await Programa.deleteMany({});
  await Instructor.deleteMany({});
  await Aprendiz.deleteMany({});
  console.log('✅ Base de datos limpia');
}

async function crearCentros() {
  console.log('🏢 Creando centros de formación...');
  const centros = [];
  
  const centrosReales = [
    { dept: 'Antioquia', ciudad: 'Medellín', nombre: 'Centro de Servicios Financieros' },
    { dept: 'Cundinamarca', ciudad: 'Bogotá', nombre: 'Centro de Tecnología de la Manufactura Avanzada' },
    { dept: 'Valle del Cauca', ciudad: 'Cali', nombre: 'Centro de Biotecnología Industrial' },
    { dept: 'Atlántico', ciudad: 'Barranquilla', nombre: 'Centro Industrial de Mantenimiento Integral' },
    { dept: 'Santander', ciudad: 'Bucaramanga', nombre: 'Centro de Industria y Construcción' },
    { dept: 'Risaralda', ciudad: 'Pereira', nombre: 'Centro de Diseño e Innovación Tecnológica' },
    { dept: 'Boyacá', ciudad: 'Tunja', nombre: 'Centro Agropecuario y de Biotecnología' },
    { dept: 'Norte de Santander', ciudad: 'Cúcuta', nombre: 'Centro de la Industria Petrolera' },
    { dept: 'Tolima', ciudad: 'Ibagué', nombre: 'Centro de Comercio y Turismo' },
    { dept: 'Huila', ciudad: 'Neiva', nombre: 'Centro de Desarrollo Agroempresarial' },
  ];

  centrosReales.forEach((centro, index) => {
    centros.push({
      id: `CENTRO_${(index + 1).toString().padStart(3, '0')}`,
      nombre: `${centro.nombre} - ${centro.ciudad}`,
      departamento: centro.dept,
      ciudad: centro.ciudad,
      direccion: `Calle ${index + 10} #${index + 5}-${index + 20}`,
      telefono: `30${index + 1}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      email: `centro${index + 1}@sena.edu.co`,
      activo: true
    });
  });

  await Centro.insertMany(centros);
  console.log(`✅ ${centros.length} centros creados`);
  return centros;
}

async function crearProgramas() {
  console.log('📚 Creando programas de formación...');
  const programas = [
    {
      id: 'PROG_001',
      nombre: 'Desarrollo de Software',
      codigo: 'ADSO',
      duracion: 24,
      modalidad: 'presencial',
      nivel: 'tecnologo',
      activo: true
    },
    {
      id: 'PROG_002',
      nombre: 'Análisis y Desarrollo de Sistemas de Información',
      codigo: 'ADSI',
      duracion: 24,
      modalidad: 'mixta',
      nivel: 'tecnologo',
      activo: true
    },
    {
      id: 'PROG_003',
      nombre: 'Gestión de Redes de Datos',
      codigo: 'GRD',
      duracion: 18,
      modalidad: 'presencial',
      nivel: 'tecnico',
      activo: true
    },
    {
      id: 'PROG_004',
      nombre: 'Diseño e Integración de Multimedia',
      codigo: 'DIM',
      duracion: 18,
      modalidad: 'virtual',
      nivel: 'tecnico',
      activo: true
    }
  ];

  await Programa.insertMany(programas);
  console.log(`✅ ${programas.length} programas creados`);
  return programas;
}

async function crearInstructores(centros) {
  console.log('👨‍🏫 Creando instructores...');
  const instructores = [];
  const especialidadesPorPrograma = {
    'Desarrollo de Software': ['JavaScript', 'Python', 'React', 'Node.js', 'Bases de Datos'],
    'Análisis y Desarrollo de Sistemas': ['Java', 'SQL', 'UML', 'Análisis de Sistemas'],
    'Gestión de Redes': ['Cisco', 'Redes', 'Seguridad', 'Linux'],
    'Multimedia': ['Adobe', 'Diseño Gráfico', 'Video', 'Animación']
  };

  for (let i = 1; i <= 50; i++) {
    const especialidadesKeys = Object.keys(especialidadesPorPrograma);
    const especialidadArea = especialidadesKeys[i % especialidadesKeys.length];
    
    instructores.push({
      id: `INST_${i.toString().padStart(3, '0')}`,
      nombre: nombresAprendices[i % nombresAprendices.length],
      apellido: apellidos[i % apellidos.length],
      email: `instructor${i}@sena.edu.co`,
      especialidades: especialidadesPorPrograma[especialidadArea].slice(0, 3),
      centroId: centros[i % centros.length].id,
      experiencia: Math.floor(Math.random() * 15) + 2,
      calificacion: Math.random() > 0.3 ? (Math.random() > 0.5 ? 5 : 4) : 3,
      activo: true
    });
  }

  await Instructor.insertMany(instructores);
  console.log(`✅ ${instructores.length} instructores creados`);
  return instructores;
}

async function crearAprendices(centros, programas) {
  console.log('🎓 Creando aprendices...');
  const aprendices = [];
  const nivelesIngles = ['A1', 'A2', 'B1', 'B2', 'C1', null, null, null]; // 60% sin nivel
  const githubUsers = ['dev', 'code', 'prog', 'soft', null, null, null]; // ~40% con GitHub

  for (let i = 1; i <= 2000; i++) {
    const centroSeleccionado = centros[Math.floor(Math.random() * centros.length)];
    const programaSeleccionado = programas[Math.floor(Math.random() * programas.length)];
    const tieneGithub = Math.random() > 0.6; // 40% tiene GitHub
    const githubUser = tieneGithub ? 
      `${githubUsers[Math.floor(Math.random() * 4)]}${i}` : null;
    
    aprendices.push({
      id: `APREN_${i.toString().padStart(4, '0')}`,
      nombre: nombresAprendices[Math.floor(Math.random() * nombresAprendices.length)],
      apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
      email: `aprendiz${i}@sena.edu.co`,
      telefono: `31${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      centroId: centroSeleccionado.id,
      programaId: programaSeleccionado.id,
      departamento: centroSeleccionado.departamento,
      ciudad: centroSeleccionado.ciudad,
      githubUser: githubUser,
      nivelIngles: nivelesIngles[Math.floor(Math.random() * nivelesIngles.length)],
      fechaInscripcion: new Date(2024, Math.floor(Math.random() * 8), Math.floor(Math.random() * 28) + 1),
      estado: Math.random() > 0.95 ? 'inactivo' : 'activo' // 5% inactivos
    });
  }

  await Aprendiz.insertMany(aprendices);
  console.log(`✅ ${aprendices.length} aprendices creados`);
  return aprendices;
}

async function ejecutarSeed() {
  try {
    console.log('🚀 Iniciando seed de la base de datos...');
    console.log(`📍 Conectando a: ${process.env.MONGO_URI.replace(/\/\/.*@/, '//***:***@')}`);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    await limpiarBaseDatos();
    
    const centros = await crearCentros();
    const programas = await crearProgramas();
    const instructores = await crearInstructores(centros);
    const aprendices = await crearAprendices(centros, programas);

    // Estadísticas finales
    console.log('\n📊 RESUMEN DE DATOS CREADOS:');
    console.log(`   🏢 Centros: ${centros.length}`);
    console.log(`   📚 Programas: ${programas.length}`);
    console.log(`   👨‍🏫 Instructores: ${instructores.length}`);
    console.log(`   🎓 Aprendices: ${aprendices.length}`);

    // Verificar distribución
    const aprendicesConGithub = aprendices.filter(a => a.githubUser).length;
    const aprendicesConIngles = aprendices.filter(a => a.nivelIngles && ['B1', 'B2'].includes(a.nivelIngles)).length;
    
    console.log('\n📈 ESTADÍSTICAS:');
    console.log(`   💻 Aprendices con GitHub: ${aprendicesConGithub} (${((aprendicesConGithub/aprendices.length)*100).toFixed(1)}%)`);
    console.log(`   🌎 Aprendices con inglés B1/B2: ${aprendicesConIngles} (${((aprendicesConIngles/aprendices.length)*100).toFixed(1)}%)`);

    console.log('\n🎉 ¡Seed completado exitosamente!');
    console.log('🔗 Ahora puedes probar el endpoint: /metrics/scalar');

  } catch (error) {
    console.error('❌ Error durante el seed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
  }
}

// Ejecutar solo si es llamado directamente
if (require.main === module) {
  ejecutarSeed();
}

module.exports = ejecutarSeed;