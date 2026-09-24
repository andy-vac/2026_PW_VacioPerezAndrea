const talleres = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JavaScript', instructor: 'Ing. María López', cupo: 25, inscritos: 10 }
];

function renderizarTablaTalleres() {
    const tabla = document.getElementById('tabla-talleres');
    let cuerpoTabla = tabla.querySelector('tbody');

    if (!cuerpoTabla) {
        cuerpoTabla = document.createElement('tbody');
        tabla.appendChild(cuerpoTabla);
    }

    cuerpoTabla.innerHTML = talleres.map(taller => `
        <tr>
            <td>${taller.nombre}</td>
            <td>${taller.instructor}</td>
            <td>${taller.cupo}</td>
            <td>${taller.inscritos}</td>
        </tr>
    `).join('');
}

renderizarTablaTalleres();

const formularioTalleres = document.getElementById('formulario-talleres');
const salidaResultado = document.getElementById('salida-resultado');
const selectorOperacion = document.getElementById('selector-operacion');

formularioTalleres.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const operacionElegida = selectorOperacion.value;

    if (operacionElegida === 'forEach') {
        salidaResultado.textContent = talleres
            .map((t) => `- ${t.nombre} (${t.inscritos}/${t.cupo})`)
            .join('\n');
    }
    else if (operacionElegida === 'map') {
        const listaNombres = talleres.map((t) => t.nombre);
        salidaResultado.textContent = `[ ${listaNombres.join(', ')} ]`;
    }
    else if (operacionElegida === 'filter') {
        const talleresLlenos = talleres.filter((t) => t.inscritos >= t.cupo);
        salidaResultado.textContent = talleresLlenos.map((t) => t.nombre).join('\n');
    }
    else if (operacionElegida === 'find') {
        const tallerEncontrado = talleres.find((t) => t.instructor === 'Ing. María López');
        salidaResultado.textContent = tallerEncontrado
            ? tallerEncontrado.nombre
            : 'No se encontró ningún taller';
    }
    else if (operacionElegida === 'reduce') {
        const sumaInscritos = talleres.reduce((acumulado, t) => acumulado + t.inscritos, 0);
        salidaResultado.textContent = `El total de inscritos hasta el momento es: ${sumaInscritos}`;
    }
    else if (operacionElegida === 'filter-map') {
        const talleresConCupo = talleres
            .filter((t) => t.inscritos < t.cupo)
            .map((t) => t.nombre);

        salidaResultado.textContent = talleresConCupo.join(' - ');
    }
    else {
        salidaResultado.textContent = 'Selecciona una operación válida.';
    }
});


// Ejercicio de objeto

const formObjeto = document.getElementById('form-objetivo');
const resultadoObjeto = document.getElementById('resultado-objeto');

formObjeto.addEventListener('submit', (evento) => {
    evento.preventDefault();

    //necesitamos construir el objeto del taller
    const taller = {
        nombre : document.getElementById('obj-nombre').value,
        instructor : document.getElementById('obj-instructor').value,
        cupo : Number(document.getElementById('obj-cupo').value),
        inscritos : Number(document.getElementById('obj-indcritos').value)

    };

    const operacion = document.getElementById('operacion-objeto').value;

    let resultado;

    switch(operacion) {
        case 'keys':
            resultado = JSON.stringify(Object.keys(taller));
            break;

        case 'values':
            const valores = Object.values(taller);

            resultado = [valores.join("\n"),'',`tipo: ${typeof valores}`].join("\n");
        break;

        case 'entries':
            const entradas = Object.entries(taller);

            resultado = [entradas.map(([campo, valor]) => `${campo}: ${valor}`),'',`tipo: ${typeof entradas}`].join("\n");
        break;

        case 'stringify':
            // Jimmy
            const textoJson = JSON.stringify(taller, null, 2);
            resultado = `${textoJson}\n \n tipo: ${typeof textoJson}`;
            break;

        case 'roundtrip':
            // Jimmy
            const textoJsons = JSON.stringify(taller, null, 2);
            const objetoDeVuelta = JSON.parse(textoJsons);

            resultado = [
                textoJsons,
                '',
                `tipo:${typeof objetoDeVuelta}`,
                objetoDeVuelta.nombre
            ].join(`\n`);
            break;
    }
    
    resultadoObjeto.textContent = resultado;
});