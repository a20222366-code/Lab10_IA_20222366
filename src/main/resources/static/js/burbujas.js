// Indicamos cada cuánto tiempo aparecerá una burbuja.
// 2000 milisegundos equivalen a 2 segundos.
const INTERVALO_BURBUJA = 2000;

// Indicamos el tamaño que tendrán las burbujas.
const TAMANO_BURBUJA = 40;

// Creamos una variable que comienza en 0.
// Nos servirá para asignar un número diferente a cada burbuja.
let numeroBurbuja = 0;


// Esta función sirve para crear una burbuja nueva.
function crearBurbuja() {

    // Buscamos el elemento HTML que tiene el id "acuario".
    // Lo guardamos en una variable llamada acuario.
    let acuario = document.getElementById("acuario");

    // Buscamos el elemento HTML que tiene el id "burbujas".
    // Lo guardamos en una variable llamada capa.
    let capa = document.getElementById("burbujas");

    // Elegimos aleatoriamente si la burbuja pertenecerá a Nemo o a Dory.
    // Math.random() genera un número aleatorio entre 0 y 1.
    // Si es menor que 0.5, la burbuja será de Nemo.
    // En caso contrario, será de Dory.
    let pez = Math.random() < 0.5 ? "nemo" : "dory";

    // Creamos un nuevo elemento HTML de tipo div para representar la burbuja.
    let burbuja = document.createElement("div");

    // Aumentamos en 1 el número de burbuja.
    numeroBurbuja++;

    // Asignamos un identificador único a la burbuja.
    // Por ejemplo: burbuja-1, burbuja-2, burbuja-3...
    burbuja.id = "burbuja-" + numeroBurbuja;


    // Asignamos las clases CSS a la burbuja.
    // La primera clase es "burbuja" y la segunda depende del pez.
    // Así podemos darle un color naranja a Nemo y azul a Dory.
    burbuja.className = "burbuja burbuja-" + pez;


    // Guardamos el nombre del pez al que pertenece la burbuja.
    // Utilizamos dataset para almacenar esta información en el elemento.
    // Después podremos consultar este dato para comprobar si se suelta en el pez correcto.
    burbuja.dataset.pez = pez;


    // Permitimos que la burbuja se pueda arrastrar con el ratón.
    burbuja.draggable = true;


    // Calculamos el espacio horizontal disponible para colocar la burbuja.
    // Restamos el tamaño de la burbuja al ancho del acuario
    // para evitar que aparezca fuera de sus límites.
    let maxIzquierda = acuario.clientWidth - TAMANO_BURBUJA;


    // Colocamos la burbuja en una posición horizontal aleatoria.
    // Math.random() genera una posición al azar.
    // Math.floor() redondea el resultado hacia abajo.
    // Finalmente, añadimos "px" para indicar que la posición está en píxeles.
    burbuja.style.left = Math.floor(Math.random() * maxIzquierda) + "px";


    // Detectamos el evento dragstart, que ocurre cuando empezamos a arrastrar la burbuja.
    burbuja.addEventListener("dragstart", function (evento) {

        // Guardamos el identificador de la burbuja que estamos arrastrando.
        // Utilizamos dataTransfer para poder recuperar ese identificador al soltarla.
        evento.dataTransfer.setData("text/plain", burbuja.id);

        // Indicamos que la operación de arrastre será para mover la burbuja.
        evento.dataTransfer.effectAllowed = "move";

    });

    // Agregamos la burbuja creada dentro del contenedor "burbujas".
    // Así conseguimos que aparezca en la pecera.
    capa.appendChild(burbuja);

}

// Esta función sirve para comprobar sobre qué pez se ha soltado la burbuja.
// Recibe las coordenadas x e y del lugar donde se suelta.
function pezEnPunto(x, y) {

    // Creamos un arreglo que relaciona cada pez con el id de su zona.
    // Nemo corresponde a "zona-nemo" y Dory a "zona-dory".
    let zonas = [["nemo", "zona-nemo"], ["dory", "zona-dory"]];


    // Recorremos el arreglo para comprobar las zonas de los dos peces.
    for (let i = 0; i < zonas.length; i++) {


        // Buscamos la zona del pez correspondiente y obtenemos su posición y tamaño.
        // getBoundingClientRect() permite conocer los límites del elemento en pantalla.
        let r = document.getElementById(zonas[i][1]).getBoundingClientRect();


        // Comprobamos si las coordenadas x e y están dentro de los límites de la zona.
        // left y right indican los límites horizontales.
        // top y bottom indican los límites verticales.
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {


            // Si el punto está dentro de una zona,
            // devolvemos el nombre del pez correspondiente.
            return zonas[i][0];

        }

    }
    // Si el punto no está dentro de ninguna de las dos zonas,
    // devolvemos null para indicar que no pertenece a ningún pez.
    return null;
}

// Buscamos el elemento HTML que tiene el id "acuario".
// Lo guardamos en una variable llamada acuario.
let acuario = document.getElementById("acuario");

// Detectamos el evento dragover cuando arrastramos una burbuja
// por encima del contenedor acuario.
acuario.addEventListener("dragover", function (evento) {

    // Evitamos el comportamiento predeterminado del navegador.
    // Esto permite que podamos soltar la burbuja dentro del acuario.
    evento.preventDefault();

});

// Detectamos el evento drop cuando soltamos una burbuja dentro del acuario.
acuario.addEventListener("drop", function (evento) {

    // Evitamos el comportamiento predeterminado del navegador al soltar la burbuja.
    evento.preventDefault();


    // Recuperamos el identificador de la burbuja que estamos arrastrando.
    // Utilizamos getData() para obtener el identificador que guardamos en dragstart.
    let id = evento.dataTransfer.getData("text/plain");


    // Buscamos la burbuja en el documento HTML utilizando el identificador recuperado.
    let burbuja = document.getElementById(id);


    // Comprobamos si la burbuja existe.
    // Si no existe, detenemos la función utilizando return.
    if (burbuja === null) {
        return;
    }
    // Averiguamos sobre qué zona se ha soltado la burbuja.
    // Utilizamos las coordenadas del ratón en el momento de soltarla.
    let pezDestino = pezEnPunto(evento.clientX, evento.clientY);

    // Comprobamos si la burbuja se ha soltado sobre el pez al que pertenece.
    if (pezDestino === burbuja.dataset.pez) {
        // Si ha caído sobre su pez correspondiente, eliminamos la burbuja.
        burbuja.remove();

        // Comprobamos si la burbuja pertenece a Nemo.
        if (pezDestino === "nemo") {
            // Si pertenece a Nemo, llamamos a sumarNemo()
            // para aumentar su contador en 1.
            sumarNemo();

        } else {
            // Si pertenece a Dory, llamamos a sumarDory()
            // para aumentar su contador en 1.
            sumarDory();

        }

    }

    // Si la burbuja se suelta en la zona equivocada o fuera de la zona de su pez,
    // no hacemos nada y permanece en su posición inicial.

});



// Ejecutamos la función crearBurbuja() cada 2 segundos.
// Así aparecen burbujas nuevas continuamente en la pecera.
setInterval(crearBurbuja, INTERVALO_BURBUJA);