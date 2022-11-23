import { Anuncio } from "./Anuncio.js";

class Anuncio_Auto extends Anuncio {
  puertas;
  kilometraje;
  potencia;

  constructor(
    id,
    titulo,
    transaccion,
    descripcion,
    precio,
    puertas,
    km,
    potencia
  ) {
    super(id, titulo, transaccion, descripcion, precio);
    this.Puertas = puertas;
    this.Kilometraje = km;
    this.Potencia = potencia;
  }

  set Puertas(value) {
    if (value != null && !isNaN(value)) {
      this.puertas = parseInt(value);
    } else {
      this.puertas = -1;
    }
  }
  set Kilometraje(value) {
    if (value != null && !isNaN(value)) {
      this.kilometraje = parseInt(value);
    } else {
      this.kilometraje = -1;
    }
  }
  set Potencia(value) {
    if (value != null && !isNaN(value)) {
      this.potencia = parseInt(value);
    } else {
      this.potencia = -1;
    }
  }
}
export default Anuncio_Auto;
