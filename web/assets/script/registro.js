const API_URL = "http://localhost/api";


const form = document.getElementById("formVisita");
const feedback = document.getElementById("feedback");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  //Capturamos los datos del formulario
  const visita = {
    nombre_visitante: document.getElementById("nombre").value.trim(),
    rut: document.getElementById("rut").value.trim(),
    motivo: document.getElementById("motivo").value.trim(),
    departamento_nombre: document.getElementById("departamento").value.trim() // input de texto
  };

 

  try {
  console.log("Datos que se enviarán al backend:", JSON.stringify(visita, null, 2));

  const res = await fetch(`${API_URL}/visitas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(visita)
  });

  const data = await res.json(); //importante para ver qué responde el backend
  console.log("Respuesta del backend:", data);

  if (res.ok) {
    feedback.textContent = "Visita registrada correctamente";
    form.reset();
  } else {
    feedback.textContent = "Error al registrar la visita: " + (data.error || "Desconocido");
  }
} catch (error) {
  console.error("Error en fetch:", error);
  feedback.textContent = "No se pudo conectar con el servidor";
}

});
