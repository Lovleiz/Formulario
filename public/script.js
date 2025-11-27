const API_URL = "http://localhost:3000/api/personajes";

const form = document.getElementById("personajeForm");
const tabla = document.querySelector("#tablaPersonajes tbody");

let editId = null;


// ======================
// Cargar lista al iniciar
// ======================
document.addEventListener("DOMContentLoaded", obtenerPersonajes);


// ======================
// Enviar formulario
// ======================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const personaje = {
    nombre: document.getElementById("nombre").value.trim(),
    raza: document.getElementById("raza").value.trim(),
    transformacion: document.getElementById("transformacion").value.trim(),
    tecnica: document.getElementById("tecnica").value.trim(),
    saga: document.getElementById("saga").value.trim(),
    historia: document.getElementById("historia").value.trim()
  };

  try {
    if (editId === null) {
      await agregarPersonaje(personaje);
    } else {
      await modificarPersonaje(editId, personaje);
    }

    form.reset();
    editId = null;
    obtenerPersonajes();

  } catch (error) {
    console.error("Error enviando datos:", error);
  }
});


// ======================
// GET → obtener lista
// ======================
async function obtenerPersonajes() {
  try {
    const res = await fetch(API_URL);
    const lista = await res.json();

    tabla.innerHTML = "";

    lista.forEach(p => {
      tabla.insertAdjacentHTML("beforeend", `
        <tr>
          <td>${p.id_personaje}</td>
          <td>${p.nombre}</td>
          <td>${p.raza}</td>
          <td>${p.transformacion}</td>
          <td>${p.tecnica}</td>
          <td>${p.saga}</td>
          <td>${p.historia}</td>

          <td class="action-btns">
            <button class="btn btn-primary btn-sm"
              onclick="cargarModificar(${p.id_personaje}, '${p.nombre}', '${p.raza}', '${p.transformacion}', '${p.tecnica}', '${p.saga}', '${p.historia}')">
              Modificar
            </button>

            <button class="btn btn-danger btn-sm"
              onclick="eliminarPersonaje(${p.id_personaje})">
              Eliminar
            </button>
          </td>
        </tr>
      `);
    });

  } catch (err) {
    console.error("Error al obtener personajes:", err);
  }
}


// ======================
// POST → agregar
// ======================
async function agregarPersonaje(personaje) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(personaje)
  });

  if (!res.ok) {
    throw new Error("Error al agregar personaje.");
  }
}


// ======================
// PUT → modificar
// ======================
async function modificarPersonaje(id, personaje) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(personaje)
  });

  if (!res.ok) {
    throw new Error("Error al modificar personaje.");
  }
}


// ======================
// Precargar en inputs
// ======================
function cargarModificar(id, nombre, raza, transformacion, tecnica, saga, historia) {
  editId = id;

  document.getElementById("nombre").value = nombre;
  document.getElementById("raza").value = raza;
  document.getElementById("transformacion").value = transformacion;
  document.getElementById("tecnica").value = tecnica;
  document.getElementById("saga").value = saga;
  document.getElementById("historia").value = historia;

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ======================
// DELETE → eliminar
// ======================
async function eliminarPersonaje(id) {
  if (!confirm("¿Eliminar personaje?")) return;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    alert("Error al eliminar.");
    return;
  }

  obtenerPersonajes();
}
