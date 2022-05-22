const articulo = []   // Aca se almacenan los objetos que se crean con el formulario

// Variables de formulario
const agregar = document.getElementById("agregar")
const error = document.getElementById("error")
const envioSi = document.getElementById("enviosi")
const envioNo = document.getElementById("enviono")
const envio = document.getElementById("envio")

// Variables del resultado del primer calculo y sus botones
const resultado = document.getElementById("resultado")
const otroProducto = document.getElementById("otroproducto")
const agregarSi = document.getElementById("agregarsi")
const agregarNo = document.getElementById("agregarno")

// Variables de la tabla
const verProductos = document.getElementById("productosoculto")
const rows = document.getElementById("ventas")
const totales = document.getElementById("total")

// Variables de la calculadora de divisas
const mostrarCambio = document.getElementById("cambio")
const primeraMoneda = document.getElementById("primeramoneda")
const segundaMoneda = document.getElementById("segundamoneda")
const botonCambio = document.getElementById("botoncambio")
const aConvertir = document.getElementById("aconvertir")
const resultadoConversion = document.getElementById("resultadoconversion")

let data = []  // Aca se almacena el objeto de la API de divisas

function crearVentaHTML() {    // Crea el objeto del tipo Venta con los valores del formulario
    let articulo = document.getElementById("nombre").value
    let comision = parseFloat(document.getElementById("comision").value)
    let enMano = parseFloat(document.getElementById("enmano").value)
    let envio = parseFloat(document.getElementById("envio").value)
    return new Venta(articulo, comision, enMano, envio)
}

function checkArticulo() {   // Checkea que se ingrese un articulo con valores validos para el calculo.
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

function mostrarOperacion() {   // Muestra la tabla
    rows.innerHTML = "";
    articulo.forEach((venta) => {
        newRow(venta);
    })
}

function newRow (venta) {    // Genera una nueva fila con los valores del Articulo
    const row = document.createElement("tr")
    let name = document.createElement("th")
    name.innerText = venta.nombre
    row.append(name)
    let comision = document.createElement("th")
    comision.innerHTML = venta.comision + " %"
    row.append(comision)
    let enMano = document.createElement("th")
    enMano.innerHTML = venta.aObtener
    row.append(enMano)
    let calculo = document.createElement("th")
    calculo.innerHTML = venta.calculoComision()
    row.append(calculo)
    let envio = document.createElement("th")
    envio.innerHTML = venta.envio
    row.append(envio)
    rows.append(row)
    totales.innerHTML = articulo.length + " articulo/s"
}

function primerArticulo(art) {     // Crea el primer resultado de la pagina y lo adjunta
    let nuevoArticulo = document.createElement("p")
    let { nombre, comision, aObtener, envio } = art
    nuevoArticulo.innerHTML = `Usted va a tener que vender el producto ${nombre} por el valor de $${art.calculoComision()} para poder obtener $${aObtener}
    ya que la plataforma le cobra una comision de ${comision}% y tiene un envio de $${envio}` // Uso de desestructuracion de objetos, util para la claridad del codigo
    resultado.innerHTML = ""
    resultado.appendChild(nuevoArticulo)
    otroProducto.style.visibility = "visible"
}

agregar.addEventListener("submit", (e) => {   // Genera un evento cuando se utiliza el boton de "calcular" del formulario
    e.preventDefault()
    if (checkArticulo() && articulo.length == 0) {
        const add = crearVentaHTML()
        articulo.push(add)
        primerArticulo(add)
    }
    else if (articulo.length == 1 && checkArticulo() && checkRespuesta()) {
        swal({
            title: "Por favor ingrese una respuesta antes de realizar otro calculo",
            icon: "error",
        });
    }
    else if (checkArticulo()) {
        const add = crearVentaHTML()
        articulo.push(add)
        newRow(add)
    }
})

envioSi.addEventListener("click", () => {
    envioSi.setAttribute("id", "enviosiclick")
    envioNo.setAttribute("id", "enviono")
    formularioEnvio("si")
})

envioNo.addEventListener("click", () => {
    envioNo.setAttribute("id", "envionoclick")
    envioSi.setAttribute("id", "enviosi")
    formularioEnvio("no")
})


agregarSi.addEventListener("click", () => {           /// Uso de libreria Sweet Alert, para tener una transicion mas fluida.
    agregarSi.setAttribute("id", "agregarsiclick")
    swal({
        title: "Tabla Generada!",
        icon: "success",
    });
    setTimeout( () => {
        agregarTabla()
    }, 1000)
})

agregarNo.addEventListener("click", () => {     //// Se reinicia la logica del programa pero se mantiene el resultado.
    swal({
        title: "No hay problema",
        icon: "info",
    });
    articulo.pop()
    otroProducto.style.visibility = "hidden"
})

function formularioEnvio(respuesta) {    // Utiliza los eventos para mostrar la barra para ingresar el valor de un envio
    if (respuesta == "si") {
        envio.type= "number"
    } else {
        envio.type = "hidden"
        envio.value = "0"
    }
}

function borrarSuperior(){              // Borra el resultado que aparece despues de calcular el primer articulo
    resultado.remove()
    otroProducto.style.visibility = "hidden"
    otroProducto.remove()
}

function agregarTabla() {
    verProductos.setAttribute("id", "contenedorvisible")
    borrarSuperior()
    mostrarOperacion()
}
function checkRespuesta() {                 // Funcion creada especificamente para no poder agregar mas objetos a la array de Articulo hasta no responder si se quiere agregar una tabla o no
    if (otroProducto.style.visibility == "visible") {
        return true
    }
}

// Debajo esta el codigo para la conversion de moneda.

const pedirConversion = async() => {                     // Uso de Fetch para obtener la informacion de la API de divisas. Doy por defecto el rate del par USD/EUR.
    const resp = await fetch("https://openexchangerates.org/api/latest.json?app_id=68b89976aef64e3e8e793ab533bf68ba")
    data = await resp.json()
    const calculoDefecto = document.createElement("p")
    const eurRate = Math.round((data.rates.EUR + Number.EPSILON) * 1000) / 1000
    calculoDefecto.innerHTML = `La cantidad de 1 USD es igual a ${eurRate} EUR`
    resultadoConversion.append(calculoDefecto)   
}

pedirConversion()  // Se almacena el objeto en la variable data para ser usado luego, esto es practico para no hacer un pedido a la API con cada calculo, la unica contra es que no se van a tener los datos mas actualizados hasta no actualizar la pagina.


function calcularConversion(monto) {
    let monedaUno = primeraMoneda.value
    let monedaDos = segundaMoneda.value
    let monedaUnoRate = data.rates[monedaUno]
    let monedaDosRate = data.rates[monedaDos]
    let resultadoConversion = monedaDosRate / monedaUnoRate * monto
    return resultadoConversion = Math.round((resultadoConversion + Number.EPSILON) * 1000) / 1000   // Mismo uso de redondeo que en "venta.js"
}

function checkConversion() {                   // Checkea que no sea un numero negativo, no es necesario avisarle al usuario que esta conversion no es posible.
    if (parseFloat(aConvertir.value) > 0) {
        return true
    }
}


botonCambio.addEventListener("click", (e) => {
    e.preventDefault()
    if (checkConversion()) {
        let monto = parseFloat(aConvertir.value)
        let resultado = calcularConversion(monto)
        resultadoConversion.innerHTML = ""
        let resultadoAdjunto = document.createElement("p")
        resultadoAdjunto.innerText = `La cantidad de ${monto} ${primeraMoneda.value} es igual a ${resultado} ${segundaMoneda.value}`
        resultadoConversion.appendChild(resultadoAdjunto)
    }
})