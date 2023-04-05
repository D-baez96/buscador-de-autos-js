//proyecto de buscador de autos
//variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado =document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

//GENERAR UN OBJETO CON LA BUSQUEDA
const datosBusqueda = {
    marca : "",
    year : "",
    minimo : "",
    maximo : "",
    puertas : "",
    transmision : "",
    color : "",
};


//eventos
document.addEventListener("DOMContentLoaded", () => {

    //muestra los automoviles al cargar 
    mostrarAutos(autos);

    //llena las opciones de años
    llenarSelect();

    
})

//Event listener para los select de busqueda
marca.addEventListener("change", e => {
    datosBusqueda.marca = e.target.value;
    
    filtarAuto(); 
})

year.addEventListener("change", e => {
    datosBusqueda.year = e.target.value;

    filtarAuto();
})

minimo.addEventListener("change", e => {
    datosBusqueda.minimo = e.target.value;

    filtarAuto();
})

maximo.addEventListener("change", e => {
    datosBusqueda.maximo = e.target.value;

    filtarAuto();
})

puertas.addEventListener("change", e => {
    datosBusqueda.puertas = e.target.value;

    filtarAuto();
})

transmision.addEventListener("change", e => {
    datosBusqueda.transmision = e.target.value;

    filtarAuto();
})

color.addEventListener("change", e => {
    datosBusqueda.color = e.target.value;
    
    filtarAuto();
})



//funciones
function mostrarAutos(autos) {

    limpiarHTML();//elimina el html previo

    autos.forEach( auto => {

        const {marca, modelo, year , puertas , transmision, precio,color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = ` 
            ${marca} ${modelo} - ${year} - ${puertas} puertas -Transmision: ${transmision} - Precio: ${precio} - Color:  ${color}
        `;

        //insertar resultado en html

        resultado.appendChild(autoHTML);
    });
}

//limpiar HTML y sobre escribir
function limpiarHTML(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// genera los años del select
function llenarSelect(){
    
    for(let i = max; i >= min; i--){
        const opcion =document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//funcion que filtra en base a la busqueda
function filtarAuto() {
    const resultado = autos.filter( filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)


    if(resultado.length ) {
        mostrarAutos(resultado);
    }else {
        noResultado();
    }

    
}

function noResultado() {

    limpiarHTML();
    const noResultado =document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent="No hay resultados para tu busqueda :(";
    resultado.appendChild(noResultado);
}

function filtrarMarca (auto){
    const {marca} = datosBusqueda; 
    if(marca){
        return auto.marca === marca; 
    }
    return auto;
}

function filtrarYear (auto){
    const {year} = datosBusqueda; 

    if(year){
        return auto.year === parseInt(year); 
    }
    return auto;
}

function filtrarMinimo (auto){
    const {minimo} = datosBusqueda; 

    if(minimo){
        return auto.precio >= minimo;  
    }
    return auto;
}

function filtrarMaximo (auto){
    const {maximo} = datosBusqueda; 

    if(maximo){
        return auto.precio <= maximo;  
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda; 

    if(puertas){
        return auto.puertas === parseInt(puertas); 
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda; 

    if(transmision){
        return auto.transmision === transmision; 
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda; 

    if(color){
        return auto.color === color; 
    }
    return auto;
}