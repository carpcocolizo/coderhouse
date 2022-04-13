/*
En esta primera subida esto es para completar el desafio, aunque toma color la pagina, esta esta aun muy verde, falta formatear bien con CSS, darle un estilo un poco mas lindo.
Y agregar funcionalidades, pero para cubrir la consigna esto es suficiente.
Voy a tratar de hacer una 2da subid a github con por lo menos mas funciones.
*/

let adentrodelloop = true 

const articulo = []
const agregar = document.getElementById("agregar")
const error = document.getElementById("error")
const verproductos = document.getElementById("productos")
const rows = document.getElementById("ventas")

let i = 0

class Venta {
    constructor(nombre, comision, aobtener) {
        this.nombre = nombre
        this.comision = comision
        this.aobtener = aobtener
    }

    calculoComision() {
        let resultado = this.aobtener / (100 - this.comision) * 100;
        return resultado = Math.round((resultado + Number.EPSILON) * 100) / 100   // No hay una forma infalible para redondear en JS, esta es la mejor opcion, en google esta la explicacion.

    }
}

function crearVentaHTML() {
    let articulo = document.getElementById("nombre").value
    let comision = parseFloat(document.getElementById("comision").value)
    let enmano = parseFloat(document.getElementById("enmano").value)
    return new Venta(articulo, comision, enmano)
}

function check() {
    if (document.getElementById("nombre") != "" && parseFloat(document.getElementById("comision").value) > 0 && parseFloat(document.getElementById("comision").value) < 100 && parseFloat(document.getElementById("enmano").value) > 0) {
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
    rows.append(row)
}

agregar.addEventListener("submit", (e) => {
    e.preventDefault()
    if (check()) {
        const add = crearVentaHTML()
        articulo.push(add)
        newRow(add)
    }
})

/* function crearVenta() {
    let articulo = prompt("Cual es el nombre del articulo que quiere vender?")
    let comision = parseFloat(prompt("Cual es la comision que te cobra la plataforma?"))
    let enMano = parseFloat(prompt("Cuanto queres que te quede por la venta?"))
    if (comision < 0 || comision >= 100 || enMano < 0) {
        alert("Usted a ingresado un valor invalido, ingrese nuevamente")
        return crearVenta()  // Si no uso return, el codigo sigue y me tira los "alert" siguientes.
    } 
    resultado = enMano / (100 - comision) * 100;
    if (isNaN(resultado)) {
        alert("Usted a ingresado un valor invalido, ingrese nuevamente")
        return crearVenta()
    } else {
        return new Venta(articulo, comision, enMano)
    }
}*/


 /* function pasodos() {
  alert("Usted a creado el siguiente articulo: " + articulo[i].nombre + "\nCon una comision del " + articulo[i].comision + "% " + "\nEl cual debe vender a: " + articulo[i].calculoComision() + "\nPara obtener " + articulo[i].aobtener)
} */

/*function verproductos() {
    let respuesta
    respuesta = prompt("Desea ver los detalles de todos los productos agregados? \n Use Si o No como respuesta").toLowerCase()
    if (respuesta == "si") {
        articulo.forEach(element => {
            alert("Nombre de producto: " + element.nombre + "\nComision que me cobran sobre el producto " + element.comision + "%" + "\nCuanto quiero obtener: " + element.aobtener + "\nA cuanto debo venderlo: " + element.calculoComision())
        })
        return preguntar()
    } else if (respuesta == "no") {
        adentrodelloop = false
        return alert("Gracias, vuelva prontos")
    } else {
        alert("Respuesta Invalida");
        play()
    }
} */

function verProductosEnHTML() {
    let respuesta
    respuesta = prompt("Desea ver los detalles de todos los productos agregados? \n Use Si o No como respuesta").toLowerCase()
    if (respuesta == "si") {
        let productos = document.getElementById("productos")
        articulo.forEach(element => {
            let elementos = document.createElement("p")
            elementos.innerHTML = `Nombre del producto: ${element.nombre}<br>
                                   Comision que me cobran sobre el producto: ${element.comision}%<br>
                                   Cuanto quiero obtener: ${element.aobtener}<br>
                                   A cuanto debo venderlo: ${element.calculoComision()}`
            productos.appendChild(elementos)
        })
        return adentrodelloop = false;
    } else if (respuesta == "no") {
        adentrodelloop = false
        let finalizar = document.getElementById("titulo")
        finalizar.innerText = "Gracias, vuelva prontos"
        finalizar.style.color = "red"
    } else {
        alert("Respuesta Invalida");
        play()
    }
}

/* function preguntar() {
    respuesta = prompt("Quiere calcular el precio a vender en base a la comision que le cobran? \nUsar una de las siguiente respuestas: \nSi \nNo").toLowerCase()
    if (respuesta == "si") {
        articulo.push(crearVenta())
        pasodos()
        i++
    } else if (respuesta == "no") {
        verProductosEnHTML()
    } else {
        alert("Respuesta Invalida");
        play()
    }
} */

/* function play () {
    while (adentrodelloop == true) {
        preguntar()
    }
} */
