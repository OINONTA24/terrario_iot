document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("planta-form");
  const infoDiv = document.getElementById("info");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const planta = document.getElementById("nombre").value.trim();

    if (!planta) {
      infoDiv.textContent = "Por favor ingresa un nombre de planta.";
      return;
    }

    try {
      const res = await fetch(`/api/planta?nombre=${encodeURIComponent(planta)}`);
      const data = await res.json();

      if (!data || !data.data || data.data.length === 0) {
        infoDiv.textContent = "No se encontró información para esta planta.";
        return;
      }

      const plantaInfo = data.data[0]; // Tomamos la primera coincidencia

      // Mostrar información básica
      infoDiv.innerHTML = `
        <h3>${plantaInfo.common_name || planta}</h3>
        <p><strong>Riego:</strong> ${plantaInfo.watering || "No disponible"}</p>
        <p><strong>Luz solar:</strong> ${plantaInfo.sunlight?.join(", ") || "No disponible"}</p>
        <p><strong>Temp. mínima:</strong> ${plantaInfo.minimum_temperature?.deg_c ?? "N/A"} °C</p>
      `;

    } catch (error) {
      console.error("Error al consultar la API:", error);
      infoDiv.textContent = "Error al obtener información de la planta.";
    }
  });
});
