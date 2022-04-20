/*
Segunda entrega, el cambio mas preponderante de los desafios, a esta nueva entrega es la incluision de una segunda pagina para ver los resultados, tal vez no es la forma mas estetica
porq a mi creer todo quedaria mejor en una pagina, pero para cumplir con la consigna tuve que hacerlo.
Con la optimizacion del codigo seguramente pueda organizar mejor algunas funciones, pero hasta aca creo que el proyecto cumple con lo necesario y tiene un funcionamiento acorde.
*/
 
const agregar = document.getElementById("agregar")
const error = document.getElementById("error")
const verproductos = document.getElementById("productos")
const rows = document.getElementById("ventas")
const enviosi = document.getElementById("enviosi")
const enviono = document.getElementById("enviono")

function crearVentaHTML() {
    let articulo = document.getElementById("nombre").value
    let comision = parseFloat(document.getElementById("comision").value)
    let enmano = parseFloat(document.getElementById("enmano").value)
    let envio = parseFloat(document.getElementById("envio").value)
    return new Venta(articulo, comision, enmano, envio)
}

function check() {
    if (document.getElementById("nombre") != "" && parseFloat(document.getElementById("comision").value) > 0 && parseFloat(document.getElementById("comision").value) < 100
     && parseFloat(document.getElementById("enmano").value) > 0 && parseFloat(document.getElementById("envio").value) >= 0) {
        error.innerHTML = ""
        return true
    }
    else {
        error.innerHTML = ""
        let desvio = document.createElement("p")
        desvio.innerText = "Por favor ingrese un valor valido"
        desvio.style.color = "red"
        error.appendChild(desvio)
        return false
    }
}

function mostrarOperacion() {
    rows.innerHTML = "";
    articulo.forEach((venta) => {
        newRow(venta);
    })
}

agregar.addEventListener("submit", (e) => {
    if (check()) {
        const add = crearVentaHTML()
        localStorage.setItem("articulo", JSON.stringify(add));
    }
    else {
        e.preventDefault()
    }
})

enviosi.addEventListener("click", () => {
    enviosi.setAttribute("id", "enviosiclick")
    enviono.setAttribute("id", "enviono")
    formularioEnvioSi()
})

enviono.addEventListener("click", () => {
    enviono.setAttribute("id", "envionoclick")
    enviosi.setAttribute("id", "enviosi")
    formularioEnvioNo()
})

function formularioEnvioSi() {
    let formularioenvio = document.getElementById("envio")
    formularioenvio.type= "number"
}

function formularioEnvioNo() {
    let formularioenvio = document.getElementById("envio")
    formularioenvio.type = "hidden"
    formularioenvio.value = "0"
}