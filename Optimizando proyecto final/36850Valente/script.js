/*
Bueno, primera vez que pienso que el desafio esta un poco de mas, el lema era "no forzarlo" pero si el codigo en realidad no necesita de estos optimizadores, en cierto punto lo terminas forzando
ya sea agregando una funcion de relleno o sea modificando un codigo perfectamente legible, sin lograr mucho. Entiendo que la idea es que usemos estas herramientas, y conocer de su existencia
por si en algun momento debemos aplicarlo.
Todos los agregados de desafio estan en "calculo.js"
Si la idea es que agregemos mas funcionalidades al proyecto de forma integral, puedo llegar a entender un poco mas el desafio, pero para lo que hice yo como proyecto no le veo el uso, para aprovechar
mejor estas herramientas deberia reformular todo el proyecto y hacer algo totalmente distinto. Lo vere cuando tenga que hacer la ultima entrega, si estoy satisfecho o no con mi trabajo. Creo que puedo
hacer algo mejor, pero tampoco se me ocurre algo en este momento.
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