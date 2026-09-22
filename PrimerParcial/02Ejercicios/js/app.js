const cursos = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JavaScript', instructor: 'Ing. María López', cupo: 25, inscritos: 10 }
];
 
function renderizarTablaCursos() {
    const tabla = document.getElementById('tabla-cursos');
    let Tabla = tabla.querySelector('tbody');
 
    if (!cuerpoTabla) {
        Tabla = document.createElement('tbody');
        tabla.appendChild(Tabla);
    }
 
    Tabla.innerHTML = cursos.map(curso => `
        <tr>
            <td>${curso.nombre}</td>
            <td>${curso.instructor}</td>
            <td>${curso.cupo}</td>
            <td>${curso.inscritos}</td>
        </tr>
    `).join('');
}
 
renderizarTablaCursos();
 
const formularioCursos = document.getElementById('formulario-cursos');
const salidaResultado = document.getElementById('salida-resultado');
const selectorOperacion = document.getElementById('selector-operacion');
 
formularioCursos.addEventListener('submit', (evento) => {
    evento.preventDefault();
 
    const operacionElegida = selectorOperacion.value;
 
    if (operacionElegida === 'forEach') {
        salidaResultado.textContent = cursos
            .map((c) => `- ${c.nombre} (${c.inscritos}/${c.cupo})`)
            .join('\n');
    }
    else if (operacionElegida === 'map') {
        const listaNombres = cursos.map((c) => c.nombre);
        salidaResultado.textContent = `[ ${listaNombres.join(', ')} ]`;
    }
    else if (operacionElegida === 'filter') {
        const cursosLlenos = cursos.filter((c) => c.inscritos >= c.cupo);
        salidaResultado.textContent = cursosLlenos.map((c) => c.nombre).join('\n');
    }
    else if (operacionElegida === 'find') {
        const cursoEncontrado = cursos.find((c) => c.instructor === 'Ing. María López');
        salidaResultado.textContent = cursoEncontrado
            ? cursoEncontrado.nombre
            : 'No se encontró ningún curso';
    }
    else if (operacionElegida === 'reduce') {
        const sumaInscritos = cursos.reduce((acumulado, c) => acumulado + c.inscritos, 0);
        salidaResultado.textContent = `El total de inscritos hasta el momento es: ${sumaInscritos}`;
    }
    else if (operacionElegida === 'filter-map') {
        const cursosConCupo = cursos
            .filter((c) => c.inscritos < c.cupo)
            .map((c) => c.nombre);
        salidaResultado.textContent = cursosConCupo.join(' - ');
    }
});