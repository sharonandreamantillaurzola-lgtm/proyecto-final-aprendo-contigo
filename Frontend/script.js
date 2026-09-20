document.addEventListener("DOMContentLoaded", () => {



  const boton = document.querySelector(".menu-hamburguesa");
  const menu = document.querySelector(".menu");

  if (boton && menu) {

    boton.addEventListener("click", () => {

      menu.classList.toggle("activo");

    });

  }
  const formulario = document.querySelector(".formulario-contacto form");


  if (formulario) {


    const acudiente = document.getElementById("acudiente");
    const telefono = document.getElementById("telefono");
    const edad = document.getElementById("edad");
    const grado = document.getElementById("grado");
    const modalidad = document.getElementById("modalidad");
    const area = document.getElementById("area");
    const mensaje = document.getElementById("mensaje");

    function mostrarMensaje(campo, texto, estado) {


      let mensajeError = campo.nextElementSibling;


      if (!mensajeError || !mensajeError.classList.contains("mensaje-error")) {


        mensajeError = document.createElement("small");

        mensajeError.classList.add("mensaje-error");


        campo.parentNode.insertBefore(
          mensajeError,
          campo.nextSibling
        );

      }
      mensajeError.textContent = texto;



      if (estado === "error") {


        campo.style.border = "2px solid red";

        mensajeError.style.color = "red";


      } else {


        campo.style.border = "2px solid green";

        mensajeError.textContent = "";

      }


    }
    function validarNombre() {


      if (acudiente.value.trim() === "") {


        mostrarMensaje(
          acudiente,
          "El nombre es obligatorio",
          "error"
        );


        return false;

      }


      mostrarMensaje(
        acudiente,
        "",
        "correcto"
      );


      return true;

    }



    function validarTelefono() {


      const telefonoRegex = /^[0-9]{10}$/;



      if (!telefonoRegex.test(telefono.value)) {


        mostrarMensaje(
          telefono,
          "Debe tener exactamente 10 números",
          "error"
        );


        return false;

      }
      mostrarMensaje(
        telefono,
        "",
        "correcto"
      );


      return true;

    }
    function validarEdad() {


      if (
        edad.value === "" ||
        edad.value < 3 ||
        edad.value > 18
      ) {


        mostrarMensaje(
          edad,
          "Ingrese una edad válida",
          "error"
        );


        return false;

      }



      mostrarMensaje(
        edad,
        "",
        "correcto"
      );


      return true;

    }
    function validarCampo(campo) {


      if (campo.value.trim() === "") {


        mostrarMensaje(
          campo,
          "Este campo es obligatorio",
          "error"
        );


        return false;

      }



      mostrarMensaje(
        campo,
        "",
        "correcto"
      );


      return true;

    }
    acudiente.addEventListener(
      "input",
      validarNombre
    );


    telefono.addEventListener(
      "input",
      validarTelefono
    );


    edad.addEventListener(
      "input",
      validarEdad
    );


    grado.addEventListener(
      "input",
      () => validarCampo(grado)
    );


    area.addEventListener(
      "input",
      () => validarCampo(area)
    );


    mensaje.addEventListener(
      "input",
      () => validarCampo(mensaje)
    );


    modalidad.addEventListener(
      "change",
      () => validarCampo(modalidad)
    );
    formulario.addEventListener(
      "submit",
      function (event) {


        const valido =

          validarNombre() &&
          validarTelefono() &&
          validarEdad() &&
          validarCampo(grado) &&
          validarCampo(modalidad) &&
          validarCampo(area) &&
          validarCampo(mensaje);



        if (!valido) {


          event.preventDefault();


          alert(
            "Por favor completa correctamente el formulario"
          );


        }


      }

    );


  }


});
// PLAN PERSONALIZADO DE APRENDIZAJE


const servicio = document.getElementById("servicio");
const listaServicios = document.getElementById("listaServicios");
const precio = document.getElementById("precio");
const botonAgregar = document.getElementById("agregarServicio");


let total = 0;


function agregarServicio() {


    let nombre = servicio.options[servicio.selectedIndex].text;

    let valor = Number(servicio.value);



    if (valor > 0) {


        let nuevoElemento = document.createElement("li");


        nuevoElemento.textContent = nombre;


        listaServicios.appendChild(nuevoElemento);



        total = total + valor;


        precio.textContent = "$" + total;


    } else {


        alert("Selecciona un servicio");


    }


}


botonAgregar.addEventListener(
    "click",
    agregarServicio
);

// ==================================================
// CONEXIÓN CON EL BACKEND DE APRENDO CONTIGO
// ==================================================

const API_URL = "https://proyecto-final-aprendo-contigo.onrender.com";

// Obtener servicios desde MongoDB
async function cargarServicios() {
    try {
        const respuesta = await fetch(`${API_URL}/productos`);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los servicios");
        }

        const servicios = await respuesta.json();

        console.log("Servicios cargados desde el backend:", servicios);

        // Buscar el menú de servicios
        const selector = document.getElementById("servicio");

        if (selector) {

            // Limpiar las opciones actuales
            selector.innerHTML = `
                <option value="0">
                    -- Elige un servicio --
                </option>
            `;

            // Agregar los servicios que vienen de MongoDB
            servicios.forEach(servicio => {

                const opcion = document.createElement("option");

                opcion.value = servicio.precio || 0;

                opcion.textContent =
                    `${servicio.nombre} - $${servicio.precio || 0}`;

                selector.appendChild(opcion);

            });
        }

        return servicios;

    } catch (error) {
        console.error("Error al conectar con el backend:", error);
    }
}