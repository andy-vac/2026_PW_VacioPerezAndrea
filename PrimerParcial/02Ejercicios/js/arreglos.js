const talleres = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JavaScript', instructor: 'Ing. María López', cupo: 25, inscritos: 10 }
];
 
console.log('Aplicando forEach para listar los talleres:');
talleres.forEach((t) => console.log(`- ${t.nombre} (${t.inscritos}/${t.cupo})`));
 
console.log('Aplicando map para obtener solo los nombres:');
const listaNombres = talleres.map((t) => t.nombre);
console.log(listaNombres);
 
console.log('Aplicando filter para encontrar los talleres llenos:');
const talleresLlenos = talleres.filter((t) => t.inscritos >= t.cupo);
console.log(talleresLlenos.map((t) => t.nombre));
 
console.log("Aplicando find para hallar el primer taller de 'Ing. María López':");
const tallerEncontrado = talleres.find((t) => t.instructor === 'Ing. María López');
console.log(tallerEncontrado);
 
console.log('Aplicando reduce para calcular el total de inscritos:');
const sumaInscritos = talleres.reduce((acumulado, t) => acumulado + t.inscritos, 0);
console.log('El total de inscritos hasta el momento es: ' + sumaInscritos);
 
console.log("Aplicando filter + map para obtener los talleres con cupo disponible:");
const talleresConCupo = talleres
    .filter((t) => t.inscritos < t.cupo)
    .map((t) => t.nombre);
console.log(talleresConCupo.join(' - '));