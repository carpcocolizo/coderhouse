class Venta {
    constructor(nombre, comision, aObtener, envio) {
        this.nombre = nombre
        this.comision = comision
        this.aObtener = aObtener
        this.envio = envio
    }

    calculoComision() {
        let resultado = this.aObtener / (100 - this.comision) * 100 + this.envio;
        return resultado = Math.round((resultado + Number.EPSILON) * 100) / 100;  // No hay una forma infalible para redondear en JS, esta es la mejor opcion, en google esta la explicacion.

    }
}