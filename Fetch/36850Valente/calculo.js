const articulo = []
const agregar = document.getElementById("agregar")
const error = document.getElementById("error")
const verproductos = document.getElementById("productosoculto")
const rows = document.getElementById("ventas")
const enviosi = document.getElementById("enviosi")
const enviono = document.getElementById("enviono")
const agregarsi = document.getElementById("agregarsi")
const tabla = document.getElementById("contenedoroculto")
const resultado = document.getElementById("resultado")
const envio = document.getElementById("envio")
const totales = document.getElementById("total")
const mostrarcambio = document.getElementById("cambio")


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

function newRow (venta) {
    const row = document.createElement("tr")
    let name = document.createElement("th")
    name.innerText = venta.nombre
    row.append(name)
    let comision = document.createElement("th")
    comision.innerHTML = venta.comision + " %"
    row.append(comision)
    let enmano = document.createElement("th")
    enmano.innerHTML = venta.aobtener
    row.append(enmano)
    let calculo = document.createElement("th")
    calculo.innerHTML = venta.calculoComision()
    row.append(calculo)
    let envio = document.createElement("th")
    envio.innerHTML = venta.envio
    row.append(envio)
    rows.append(row)
    totales.innerHTML = articulo.length + " articulo/s"
}

agregar.addEventListener("submit", (e) => {
    e.preventDefault()
    if (check()) {
        const add = crearVentaHTML()
        articulo.push(add)
        newRow(add)
    }
})

enviosi.addEventListener("click", () => {
    enviosi.setAttribute("id", "enviosiclick")
    enviono.setAttribute("id", "enviono")
    formularioEnvio("si")
})

enviono.addEventListener("click", () => {
    enviono.setAttribute("id", "envionoclick")
    enviosi.setAttribute("id", "enviosi")
    formularioEnvio("no")
})

function formularioEnvio(respuesta) {
    if (respuesta == "si") {
        envio.type= "number"
    } else {
        envio.type = "hidden"
        envio.value = "0"
    }
}

function primerArticulo(art) {
    let nuevoarticulo = document.createElement("p")
    let { nombre, comision, aobtener, envio } = art
    nuevoarticulo.innerHTML = `Usted va a tener que vender el producto ${nombre} por el valor de $${art.calculoComision()} para poder obtener $${aobtener}
    ya que la plataforma le cobra una comision de ${comision}% y tiene un envio de $${envio}` // Uso de desestructuracion de objetos, util para la claridad del codigo
    resultado.appendChild(nuevoarticulo)
}

function borrarsuperior(){
    let borrarOperacion = document.getElementById("otroproducto")
    let titulo = document.getElementById("titulo")
    titulo.innerHTML = "Agregar otro articulo para calcular el precio de venta a partir de la comision de la plataforma"
    resultado.remove()
    borrarOperacion.remove()
}

agregarsi.addEventListener("click", () => {
    agregarsi.setAttribute("id", "agregarsiclick")
    swal({
        title: "Tabla Generada!",
        icon: "success",
      });
    setTimeout( () => {
        agregarTabla()
    }, 1000)
})

function agregarTabla() {
    verproductos.setAttribute("id", "contenedorvisible")
    tabla.setAttribute("id", "productosvisible")
    borrarsuperior()
    mostrarOperacion()
}

recuperarobjeto = JSON.parse(localStorage.getItem("articulo"))

instanciar = new Venta(recuperarobjeto.nombre, recuperarobjeto.comision, recuperarobjeto.aobtener, recuperarobjeto.envio)

instanciar?.nombre || console.log("La propiedad nombre no existe")  // Condicional para verficiar la existancia de las propiedades de instanciar

typeof recuperarobjeto == "object" && articulo.push(instanciar)  // Operador ternario aplicado

primerArticulo(instanciar)

const pedirConversion = async() => { 
    const resp = await fetch("https://exchange-rates.abstractapi.com/v1/live/?api_key=3799f5db2bd7431492652cc9da78a95d&base=USD")
    const data = await resp.json()
    const p = document.createElement("p")
    p.innerHTML = `Cambio del dia <br>
                   1 USD = ${data.exchange_rates.EUR} EUR <br>
                   1 USD = ${data.exchange_rates.BTC} BTC`
    cambio.append(p)    
}

pedirConversion()