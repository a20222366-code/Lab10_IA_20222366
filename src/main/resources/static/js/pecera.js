function crearPecera(x) {

    // Buscamos en el documento HTML el elemento que tiene el id "pecera"
    // Y lo guardamos en una variable llamada pecera
    let pecera = document.getElementById("pecera");


    // Limpiamos todo el contenido que este dentro del contenedor pecera
    pecera.innerHTML = "";

    // Definimos la cantidad de columnas de la pecera.
    // Utilizamos repeat para indicar cuántas columnas queremos crear (x),
    // 1fr hace que todas compartan el espacio disponible por igual,
    // adaptando su tamaño según la cantidad de columnas.
    pecera.style.gridTemplateColumns = "repeat(" + x + ", 1fr)";


    for (let i = 0; i < x * x; i++) {

        // Creamos un nuevo elemento HTML de tipo div
        // para que represente una celda de la pecera
        let celda = document.createElement("div");


        // Asignamos la clase CSS "celda" al div que creamos
        // Así cada celda tendrá los estilos definidos en style.css
        celda.className = "celda";


        // Agregamos la celda creada dentro del contenedor principal pecera
        // Cada vez que se repita el ciclo se agrega una nueva celda
        pecera.appendChild(celda);

    }

}


crearPecera(6);