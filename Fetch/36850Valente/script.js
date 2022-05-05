/*
Use una API para obtener los datos de cotizaciones de monedas, creo que es relavante por si quisieramos hacer alguna conversion, pensandolo para el proyecto final se podria armar una calculadora
que permita hacer la conversion.
https://www.abstractapi.com/exchange-rate-api
En esa pagina se puede encontrar la informacion de la api.
*/
 
const agregar = document.getElementById("agregar")
const error = document.getElementById("error")
const enviosi = document.getElementById("enviosi")
const enviono = document.getElementById("enviono")
const envio = document.getElementById("envio")
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
