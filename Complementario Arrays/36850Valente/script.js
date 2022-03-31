/*
El objetivo del programa es para poder calcular a cuanto deberias vender algo, para poder obterner determinada cantidad en base a una comision de la plataforma de venta
Por ejemplo, si Mercado Libre nos cobra 12.5% y queremos obtener 100 pesos de nuestra venta, algun desprevenido en un calculo simple podria crear que el precio de venta deberia ser 112.5.
Pero en realidad para obtener nuestros 100 pesos deberiamos ponerlo a la venta en 114.29.

Utilizo una sola variable global, que es para mantenerme en un loop mientras el usuario no elija salir. Podria hacer esto sin necesitar un loop posiblmente, pero para cumplir las condiciones
del ejercicio decidi hacerlo de esta manera.

Las funciones son bastante claras, tal vez podria sub dividir la funcion de calculoComision(), pero no creo que este dificil de entender.

Deje como comentario el "let envio", porque se me ocurrio preguntarle al usuario si la plataforma le cobra un envio, y dependiendo de si el comprador o el vendedor se hace cargo de este, deducirlo
o no del calculo.
Asi como tambien pense en incluir un calculo de coste, preguntando cuanto vale comprar el producto o los materiales para armarlo y cual es la ganancia esperada.
Pero creo que seria algo desordenado incluir toda esta informacion en prompt()
Por lo cual en un futuro lo podria agregar, cuando usemos el DOM y nos relacionemos con el HTML, con botones y formularios se podria incluir y tener mucho mas sentido en el codigo.
*/
let adentrodelloop = true 

function calculoComision() {
    let comision = parseFloat(prompt("Cual es la comision que te cobra la plataforma?"))
    let enMano = parseFloat(prompt("Cuanto queres que te quede por la venta?"))
    // let envio = prompt()  // Para incluir en un futuro
    let resultado
    if (comision < 0 || comision >= 100 || enMano < 0) {
        alert("Usted a ingresado un valor invalido, ingrese nuevamente")
        return calculoComision()  // Si no uso return, el codigo sigue y me tira los "alert" siguientes.
    } 
    resultado = enMano / (100 - comision) * 100;
        if (isNaN(resultado)) {
        alert("Usted a ingresado un valor invalido, ingrese nuevamente")
        calculoComision()
    } else {
        resultado = Math.round((resultado + Number.EPSILON) * 100) / 100   // No hay una forma infalible para redondear en JS, esta es la mejor opcion, en google esta la explicacion.
        alert("El precio al cual debe vender para que le queden " + enMano + " en mano, es de: " + resultado)
    }
}

function preguntar() {
    respuesta = prompt("Quiere calcular el precio a vender en base a la comision que le cobran? \nUsar una de las siguiente respuestas: \nSi \nNo").toLowerCase()
    if (respuesta == "si") {
        calculoComision()
    } else if (respuesta == "no") {
        adentrodelloop = false
        return alert("Gracias, vuelva prontos")
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