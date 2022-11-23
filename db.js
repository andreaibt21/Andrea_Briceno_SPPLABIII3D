const URL = "http://localhost:3000/anuncios";

export const getAnunciosAjax = () => {
  const divSpinner = document.getElementById("spinner-container");

  return new Promise((resolve, reject) => {
    setSpinner(divSpinner);
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          clearSpinner(divSpinner);
          resolve(data);
        } else {
          reject({ status: xhr.status, statusText: xhr.statusText });
        }
      }
    });

    xhr.open("GET", URL);
    xhr.send();
  });
};

export const createAnuncio = (nuevoAnuncio) => {
  const divSpinner = document.getElementById("spinner-container");
  setSpinner(divSpinner);

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr);
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        clearSpinner(divSpinner);
      } else {
        console.log(`Error ${xhr.status} - ${xhr.statusText}`);
      }
    }
  });
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(nuevoAnuncio));
};

export const updateAnuncio = (anuncio) => {
  const divSpinner = document.getElementById("spinner-container");
  console.log(anuncio);

  setSpinner(divSpinner);

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr);
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        clearSpinner(divSpinner);
      } else {
        console.log(`Error ${xhr.status} - ${xhr.statusText}`);
      }
    }
  });
  xhr.open("PUT", URL + "/" + anuncio.id);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(anuncio));
};

export const getAnuncio = (id) => {
  const divSpinner = document.getElementById("spinner-container");
  setSpinner(divSpinner);
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr);
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        clearSpinner(divSpinner);
      } else {
        console.log(`Error ${xhr.status} - ${xhr.statusText}`);
      }
    }
  });
  xhr.open("GET", URL + "/" + id);
  xhr.send();
};

export const eliminarAnuncioFetch = (id) => {
  const divSpinner = document.getElementById("spinner-container");
  const options = {
    method: "DELETE",
  };
  setSpinner(divSpinner);

  fetch(URL + "/" + id, options)
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status} : ${res.statusText}`)
    )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      clearSpinner(divSpinner);
    });
};

export const setSpinner = (div) => {
  const img = document.createElement("img");
  img.setAttribute("src", "./assets/preloader.gif");
  img.setAttribute("alt", "spinner");
  div.appendChild(img);
};

export const clearSpinner = (div) => {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
};
