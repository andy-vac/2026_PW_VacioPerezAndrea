const talleres = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JavaScript', instructor: 'Ing. María López', cupo: 25, inscritos: 10 }
];
 
console.log('Aplicando forEach para listar los cursos:');
cursos.forEach((c) => console.log(`- ${c.nombre} (${c.inscritos}/${c.cupo})`));
 
console.log('Aplicando map para obtener solo los nombres:');
const listaNombres = cursos.map((c) => c.nombre);
console.log(listaNombres);
 
console.log('Aplicando filter para encontrar los cursos llenos:');
const cursosLlenos = cursos.filter((c) => c.inscritos >= c.cupo);
console.log(cursosLlenos.map((c) => c.nombre));
 
console.log("Aplicando find para hallar el primer curso de 'Ing. María López':");
const cursoEncontrado = cursos.find((c) => c.instructor === 'Ing. María López');
console.log(cursoEncontrado);
 
console.log('Aplicando reduce para calcular el total de inscritos:');
const sumaInscritos = cursos.reduce((acumulado, c) => acumulado + c.inscritos, 0);
console.log('El total de inscritos hasta el momento es: ' + sumaInscritos);
 
console.log("Aplicando filter + map para obtener los cursos con cupo disponible:");
const cursosConCupo = cursos
    .filter((c) => c.inscritos < c.cupo)
    .map((c) => c.nombre);
console.log(cursosConCupo.join(' - '));