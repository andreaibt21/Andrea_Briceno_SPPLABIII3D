export class Anuncio {
  id;
  titulo;
  transaccion;
  descripcion;
  precio;

  constructor(id, titulo, transaccion, descripcion, precio) {
    this.Id = id;
    this.Titulo = titulo;
    this.Transaccion = transaccion;
    this.Descripcion = descripcion;
    this.Precio = precio;
  }

  set Id(value) {
    if (value != null && !isNaN(value)) {
      this.id = parseInt(value);
    } else {
      this.id = -1;
    }
  }
  set Titulo(value) {
    if (value != null && isNaN(value)) {
      this.titulo = value.trim();
    } else {
      this.titulo = "error";
    }
  }
  set Transaccion(value) {
    if (value != null && isNaN(value)) {
      this.transaccion = value.trim();
    } else {
      this.transaccion = "error";
    }
  }
  set Descripcion(value) {
    if (value != null && isNaN(value)) {
      this.descripcion = value.trim();
    } else {
      this.descripcion = "error";
    }
  }
  set Precio(value) {
    if (value != null && !isNaN(value)) {
      this.precio = parseFloat(value);
    } else {
      this.precio = -1;
    }
  }
}
