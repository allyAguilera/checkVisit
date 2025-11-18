const API_URL = "http://localhost:5050/api";
const tabla = document.getElementById("tabla-visitas");

async function cargarVisitas() {
  const res = await fetch(`${API_URL}/visitas`);
  const data = await res.json();

  tabla.innerHTML = "";
  data.forEach(v => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${v.id}</td>
      <td>${v.nombre_visitante}</td>
      <td>${v.rut}</td>
      <td>${v.motivo}</td>
      <td>${v.departamento}</td>
      <td>${v.fecha_ingreso ? new Date(v.fecha_ingreso).toLocaleString() : "-"}</td>
      <td>${v.fecha_salida ? new Date(v.fecha_salida).toLocaleString() : "En visita"}</td>
      <td>
        ${v.fecha_salida ? "" : `<button onclick="marcarSalida(${v.id})">Salida</button>`}
        <button onclick="eliminarVisita(${v.id})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Marcar salida
async function marcarSalida(id) {
  await fetch(`${API_URL}/visitas/${id}/salida`, { method: "PUT" });
  cargarVisitas();
}

// Eliminar visita
async function eliminarVisita(id) {
  await fetch(`${API_URL}/visitas/${id}`, { method: "DELETE" });
  cargarVisitas();
}

cargarVisitas();
