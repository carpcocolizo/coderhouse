/*
Para cumplir la consigna de incorporar arrays se me ocurrio crear cada iteracion satisfactoria del programa como un objeto y almacenarlo en una Array 
Despues reestructure el codigo para usar las propiedad y metodos de las array y hash.
Podria seguir mejorando el codigo, pero el proximo entregable es con este mismo codigo, por lo que voy a hacerlo en ese momento
*/

let adentrodelloop = true 

const articulo = []

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

function crearVenta() {
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
}

function pasodos() {
  alert("Usted a creado el siguiente articulo: " + articulo[i].nombre + "\nCon una comision del " + articulo[i].comision + "% " + "\nEl cual debe vender a: " + articulo[i].calculoComision() + "\nPara obtener " + articulo[i].aobtener)
}

function verproductos() {
    let respuesta
    respuesta = prompt("Desea ver los detalles de todos los productos agregados? \n Use Si o No como respuesta").toLowerCase()
    if (respuesta == "si") {
        for (const element of articulo) {
            alert("Nombre de producto: " + element.nombre + "\nComision que me cobran sobre el producto " + element.comision + "%" + "\nCuanto quiero obtener: " + element.aobtener + "\nA cuanto debo venderlo: " + element.calculoComision())
        }
        return preguntar()
    } else if (respuesta == "no") {
        adentrodelloop = false
        return alert("Gracias, vuelva prontos")
    } else {
        alert("Respuesta Invalida");
        play()
    }
}

function preguntar() {
    respuesta = prompt("Quiere calcular el precio a vender en base a la comision que le cobran? \nUsar una de las siguiente respuestas: \nSi \nNo").toLowerCase()
    if (respuesta == "si") {
        articulo.push(crearVenta())
        pasodos()
        i++
    } else if (respuesta == "no") {
        verproductos()
    } else {
        alert("Respuesta Invalida");
        play()
    }
}

function play () {
    while (adentrodelloop == true) {
        preguntar()
    }
}

play()  // Para correr el programa