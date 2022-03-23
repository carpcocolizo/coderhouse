// Este programa te permite ingresar un nombre y cambiar los caracteres de este mismo por los que siguen dos a la derecha del alfabeto

let nombre = prompt("Ingresa solo tu primer nombre").toLowerCase()
longitud = nombre.length
let i
let nuevonombre = ""
let temp

for (i = 0; i < longitud; i++) {
    temp = nombre.charCodeAt(i) + 2
    console.log(temp)
    if (temp >= 99 && temp <= 122) {
        nuevonombre = nuevonombre + String.fromCharCode(temp)
    }
    else if (temp == 123) {
        nuevonombre = nuevonombre + "a"
    }
    else if (temp == 124) {
        nuevonombre = nuevonombre + "b"
    }
}

mayus = nuevonombre
nuevonombre = nuevonombre.charAt(0).toUpperCase() + mayus.slice(1)
alert("TU NUEVO NOMBRE DESDE AHORA ES " + nuevonombre)