export const validarCampoVacio = (e) => {
  const input = e.target;
  const value = input.value.trim();

  if (!value) {
    setError(input);
  } else {
    clearError(input);
  }
};

const setError = (input, mensaje) => {
  const small = input.nextElementSibling;
  if (small) {
    if (mensaje) {
      small.textContent = mensaje;
    } else {
      console.log(small);
      small.textContent = `campo requerido`;
    }

    input.classList.remove("inputOk");
    input.classList.add("inputError");

    small.classList.add("danger");
  }
};

const clearError = (input, mensaje) => {
  const small = input.nextElementSibling;
  if (small) {
    small.textContent = "";
    input.classList.add("inputOk");
    input.classList.remove("inputError");
  }
};

export const validarNumero = (e) => {
  const pattern = /[^a-z ]\ *([.0-9])*\d/g;
  const input = e.target;
  //AGREGAR LIMITES
  if (input.value) {
    if (!isNaN(input.value.trim())) {
      clearError(input);
    } else {
      setError(input, "Ingrese solo numeros");
    }
  } else {
    setError(input);
  }
};

export const validarExtencion = (e) => {
  const extenciones = ["gif", "jpg", "png", "jpeg"];
  const input = e.target;
  const nombre = input.files[0].name;

  const extension = nombre.split(".").pop();

  if (extenciones.includes(extension)) {
    clearError(input);
  } else {
    setError(input, "archivo invalido");
  }
};

export const validarTexto = (e) => {
  const input = e.target;
  const pattern = /^([a-zA-Z])\w+/g;
  const text = input.value.trim();
  let message = "";
  if (!validarLogitud(input, 4, 25)) {
    message = "El campo debe contener entre 4 y 25 caracteres. ";
  }
  if (!pattern.test(text)) {
    message += "Solo se admiten caracteres alfabeticos.";
  }
  if (message !== "") {
    setError(input, message);
  } else {
    clearError(input);
  }
};
const validarLogitud = (input, min, max) => {
  const text = input.value.trim();
  return text.length >= min && text.length <= max;
};

export const validarPuertas = (e) => {
  const input = e.target;
  const number = Number(input.value);
  let mensaje = "numero invalido";

  console.log(number, number === 2 || number === 4 || number === 5);

  if (number === 2 || number === 4 || number === 5) {
    clearError(input);
  } else {
    mensaje = "numero invalido";
    setError(input, mensaje);
  }
};

export const validarRango = (e, min, max) => {
  const input = e.target;
  const number = Number(input.value);
  let mensaje = `numero esta fuera del rango (${min} - ${max}) `;

  console.log(number, number >= min && number <= max);
  if (number >= min && number <= max) {
    clearError(input);
  } else {
    setError(input, mensaje);
    console.log("entro");
  }
};
