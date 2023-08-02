class Itinerario {
    constructor(ciudadOrigen, ciudadDestino, horarioSalida, horarioLlegada, precioPasaje, busAsignado) {
        this.ciudadOrigen = ciudadOrigen;
        this.ciudadDestino = ciudadDestino;
        this.horarioSalida = horarioSalida;
        this.horarioLlegada = horarioLlegada;
        this.precioPasaje = precioPasaje;
        this.busAsignado = busAsignado;
    }
  
    // Métodos adicionales para validaciones u operaciones relacionadas con itinerarios...
}

module.exports = Itinerario;