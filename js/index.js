import { Anuncio } from "./Anuncio.js";
import { crearTabla } from "./tablaDinamica.js";
// import { anuncios, guardarEnLocalStorage, agregarAnuncio } from "./storage.js";
import Anuncio_Auto from "./Anuncio_Auto.js";
import {
  validarCampoVacio,
  validarRango,
  validarPuertas,
  validarTexto,
} from "./validaciones.js";
import {
  createAnuncio,
  updateAnuncio,
  getAnunciosAjax,
  eliminarAnuncioFetch,
  setSpinner,
  clearSpinner,
} from "../db.js";
const URL = "http://localhost:3000/anuncios";
const formulario = document.forms[0];
const controles = formulario.elements;
const {
  txtTitulo,
  txtDescripcion,
  txtPrecio,
  txtPuertas,
  txtKMs,
  txtPotencia,
  chTransaccion,
} = formulario;
const small = document.getElementById("mensaje-form");
const btnGuardar = document.getElementById("btnGuardar");
const btnEliminar = document.getElementById("btnEliminar");
const btnModificar = document.getElementById("btnModificar");
const checkbox = document.querySelectorAll(".chbox");
const promedio = document.getElementById("promedio");
const tabla = document.getElementById("divTabla");
const divTabla = document.getElementById("divTabla");

const select = document.getElementById("filtro");
console.log(checkbox);

let cantidadInputVacios = 0;
let idSelecionado;

const anun = await getAnunciosAjax();
console.log("anun", anun);

const listaAnuncios = anun;

window.addEventListener("load", () => {
  actualizarTabla(listaAnuncios);
});

//VALIDACIONES
for (let i = 0; i < controles.length; i++) {
  const control = controles.item(i);

  if (control.matches("input")) {
    control.addEventListener("blur", validarCampoVacio);
    if (control.matches("[type=text]")) {
      control.addEventListener("blur", validarTexto);
    } else if (control.matches("[id=txtKMs]")) {
      control.addEventListener("blur", (e) => validarRango(e, 0, 200000));
    } else if (control.matches("[id=txtPotencia]")) {
      control.addEventListener("blur", (e) => validarRango(e, 50, 300));
    }
  }
}

// CREAR ANUNCIO
btnGuardar.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 0; i < controles.length; i++) {
    const control = controles.item(i);
    if (control.matches("[type=text]")) {
      if (!control.classList.contains("inputOk")) {
        cantidadInputVacios++;
      }
    }
  }
  console.log(cantidadInputVacios);
  if (cantidadInputVacios == 0) {
    const titulo = txtTitulo.value;
    const descripcion = txtDescripcion.value;
    const precio = txtPrecio.value;
    const puertas = txtPuertas.value;
    const km = txtKMs.value;
    const potencia = txtPotencia.value;
    const transaccion = chTransaccion.value;
    let nuevoAnuncio = new Anuncio_Auto(
      Date.now(),
      titulo,
      transaccion,
      descripcion,
      precio,
      puertas,
      km,
      potencia
    );
    //simularCarga(nuevoAnuncio);
    createAnuncio(nuevoAnuncio);
    small.classList.remove("danger", "smallError");
    small.textContent = "";
  } else {
    small.textContent = "Error, intente nuevamente";
    small.classList.add("danger", "smallError");
    cantidadInputVacios = 0;
  }
});

//CREAR TABLA
divTabla.appendChild(crearTabla(listaAnuncios));

const actualizarTabla = (lista) => {
  const divTabla = document.getElementById("divTabla");
  if (divTabla.children.length > 0 && lista.length > 0) {
    const table = crearTabla(lista);
    divTabla.removeChild(divTabla.children[0]);
    divTabla.appendChild(table);
  } else if (lista.length > 0) {
    const table = crearTabla(lista);
    divTabla.appendChild(table);
  }
};

const limpiarInputs = () => {
  const {
    txtTitulo,
    txtDescripcion,
    txtPrecio,
    txtPuertas,
    txtKMs,
    txtPotencia,
    chVenta,
  } = controles;

  txtTitulo.value = "";
  txtDescripcion.value = "";
  txtPrecio.value = "";
  txtPuertas.value = "";
  txtKMs.value = "";
  txtPotencia.value = "";
  chVenta.checked = true;
  txtTitulo.classList.remove("inputOk");
  txtDescripcion.classList.remove("inputOk");
  txtPrecio.classList.remove("inputOk");
  txtPuertas.classList.remove("inputOk");
  txtKMs.classList.remove("inputOk");
  txtPotencia.classList.remove("inputOk");
};

tabla.addEventListener("click", (e) => {
  const emisor = e.target;
  if (emisor.matches("tbody tr td")) {
    idSelecionado = emisor.parentElement.id;
    const anuncio = listaAnuncios.find(
      (element) => element.id == idSelecionado
    );
    console.log("idSelecionado", idSelecionado);

    completarForm(anuncio);

    const btnGuardar = document.getElementById("btnGuardar");
    const btnEliminar = document.getElementById("btnEliminar");
    const btnModificar = document.getElementById("btnModificar");

    btnGuardar.classList.add("d-none");
    btnEliminar.classList.remove("d-none");
    btnModificar.classList.remove("d-none");
  }
});

btnModificar.addEventListener("click", (e) => {
  e.preventDefault();
  const titulo = txtTitulo.value;
  const descripcion = txtDescripcion.value;
  const precio = txtPrecio.value;
  const puertas = txtPuertas.value;
  const km = txtKMs.value;
  const potencia = txtPotencia.value;
  const transaccion = chTransaccion.value;
  let anuncioModificado = new Anuncio_Auto(
    idSelecionado,
    titulo,
    transaccion,
    descripcion,
    precio,
    puertas,
    km,
    potencia
  );

  updateAnuncio(anuncioModificado);
});

btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(idSelecionado);
  eliminarAnuncioFetch(idSelecionado);
});

const completarForm = (anuncio) => {
  const {
    txtTitulo,
    txtDescripcion,
    txtPrecio,
    txtPuertas,
    txtKMs,
    txtPotencia,
    chTransaccion,
  } = controles;
  if (anuncio.transaccion === "venta") {
    chVenta.checked = true;
  } else {
    chAlquiler.checked = true;
  }
  txtTitulo.value = anuncio.titulo;
  txtDescripcion.value = anuncio.descripcion;
  txtPrecio.value = anuncio.precio;
  txtPuertas.value = anuncio.puertas;
  txtKMs.value = anuncio.kilometraje;
  txtPotencia.value = anuncio.potencia;
  txtTitulo.classList.add("inputOk");
  txtDescripcion.classList.add("inputOk");
  txtPrecio.classList.add("inputOk");
  txtPuertas.classList.add("inputOk");
  txtKMs.classList.add("inputOk");
  txtPotencia.classList.add("inputOk");
};

//PROMEDIO
const calcularPromedio = (anuncios) => {
  let suma = anuncios.reduce((anterior, actual) => {
    let add = anterior + parseFloat(actual.precio);
    return add;
  }, 0);

  return Math.round(suma / anuncios.length);
};

// ANUNCIOS POR TRANSACCION

const filtrarAnuncios = (data, seleccion) => {
  console.log(data, seleccion);

  const divSpinner = document.getElementById("spinner-container");
  setSpinner(divSpinner);

  setTimeout(() => {
    if (seleccion !== "Todos") {
      clearSpinner(divSpinner);
      const array = data.filter(
        (elemento) => elemento.transaccion == seleccion
      );
      console.log(array);
      promedio.value = calcularPromedio(array);

      actualizarTabla(array);
    } else {
      actualizarTabla(data);

      clearSpinner(divSpinner);
      return data;
    }
  }, 3000);
};
select.addEventListener("change", () => {
  filtrarAnuncios(listaAnuncios, select.value);
  promedio.value = calcularPromedio(listaAnuncios);
});

//TABLA POR CHECKS
const checkearTabla = () => {
  const check = {};
  checkbox.forEach((elemento) => {
    check[elemento.name] = elemento.checked;
  });

  const listaChecks = listaAnuncios.map((elemento) => {
    const fila = {};
    for (const key in elemento) {
      if (check[key] || key == "id") {
        fila[key] = elemento[key];
      }
    }

    return fila;
  });
  console.log(listaChecks);
  actualizarTablaPorCheckb(listaChecks);
};

const actualizarTablaPorCheckb = (listaChecks) => {
  divTabla.removeChild(divTabla.children[0]);

  divTabla.appendChild(crearTabla(listaChecks));
};
checkbox.forEach((element) => element.addEventListener("click", checkearTabla));
