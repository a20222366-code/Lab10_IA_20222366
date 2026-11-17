// Nemo -> localStorage (sobrevive a cambiar de pestaña y a cerrar el navegador)
// Dory -> sessionStorage (solo vive en esta pestaña)


// Esta función sirve para recuperar el número que tenemos guardado.
// Recibe dos cosas:
// almacen: dónde está guardado el número.
// clave: el nombre con el que guardamos ese número.
function leerContador(almacen, clave) {
    // Buscamos el número guardado utilizando su nombre (clave).
    // con getItem ya que permite recuperar un dato guardado.
    let valor = almacen.getItem(clave);

    // Comprobamos si existe un número guardado.
    // Si no existe (valor === null), devolvemos 0.
    // Si existe, convertimos el texto recuperado en un número
    // utilizando parseInt().
    return valor === null ? 0 : parseInt(valor);
}


// Esta función muestra en pantalla los contadores de Nemo y Dory.
function mostrarContadores() {

    // Buscamos el elemento HTML que tiene el id "contador-nemo".
    // y le ponemos el número que tenemos guardado en localStorage.
    document.getElementById("contador-nemo").innerText = leerContador(localStorage, "contadorNemo");


    // Buscamos el elemento HTML que tiene el id "contador-dory".
    // Le ponemos el número que tenemos guardado en sessionStorage.
    document.getElementById("contador-dory").innerText = leerContador(sessionStorage, "contadorDory");
}


// Esta función se ejecuta cuando pulsamos el botón de Nemo.
function sumarNemo() {
    // Recuperamos el número que tiene Nemo guardado y le sumamos 1.
    let total = leerContador(localStorage, "contadorNemo") + 1;

    // Guardamos el nuevo número de Nemo en localStorage.
    localStorage.setItem("contadorNemo", total);

    // Actualizamos los números que aparecen en pantalla.
    mostrarContadores();
}

// Esta función se ejecuta cuando pulsamos el botón de Dory.
function sumarDory() {
    // Recuperamos el número que tiene Dory guardado
    // y le sumamos 1.
    let total = leerContador(sessionStorage, "contadorDory") + 1;

    // Guardamos el nuevo número de Dory en sessionStorage.
    sessionStorage.setItem("contadorDory", total);

    // Actualizamos los números que aparecen en pantalla.
    mostrarContadores();
}

// Ejecutamos esta función cuando se carga el archivo JavaScript.
// Así aparecen los números que ya estaban guardados.
mostrarContadores();


// Guardamos los colores que vamos a utilizar.
// Cada color tiene tres números: rojo, verde y azul (RGB).

// Color inicial: azul claro (lightblue).
const COLOR_INICIAL = [173, 216, 230];

// Color final: verde (green).
const COLOR_FINAL = [0, 128, 0];

// Indicamos cuántos segundos tardará en llegar al color verde.
const SEGUNDOS_TOTALES = 60;

// Creamos una variable que comienza en 0.
// para que vaya contando los segundos que pasan.
let segundos = 0;


// Esta función se encarga de cambiar el color del agua.
function actualizarColor() {

    // Calculamos cuánto tiempo ha pasado respecto a los 60 segundos.
    // Con Math.min evitamos que el resultado sea mayor que 1.
    let t = Math.min(segundos / SEGUNDOS_TOTALES, 1);

    // Calculamos el valor del color rojo.
    // Vamos cambiando poco a poco desde el color inicial
    // hasta el color final.
    let r = Math.round(COLOR_INICIAL[0] + (COLOR_FINAL[0] - COLOR_INICIAL[0]) * t);

    // Calculamos el valor del color verde.
    let g = Math.round(COLOR_INICIAL[1] + (COLOR_FINAL[1] - COLOR_INICIAL[1]) * t);


    // Calculamos el valor del color azul.
    let b = Math.round(COLOR_INICIAL[2] + (COLOR_FINAL[2] - COLOR_INICIAL[2]) * t);

    // Buscamos el contenedor de la pecera.
    // Después cambiamos el valor de la variable CSS --agua
    // utilizando el nuevo color calculado en RGB.
    document.getElementById("pecera").style.setProperty("--agua", "rgb(" + r + "," + g + "," + b + ")");
}

// Esta instrucción ejecuta una función cada 1000 milisegundos, es decir, cada segundo.
setInterval(function () {

    // Sumamos 1 a la cantidad de segundos transcurridos.
    segundos++;

    // Actualizamos el color de la pecera.
    actualizarColor();
}, 1000);