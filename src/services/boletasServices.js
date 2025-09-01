const API_URL_CREAR_BOLETA = "http://localhost:3000/api/crearBoleta";
const API_URL_BUSCAR_BOLETA = "http://localhost:3000/api/buscarBoleta";

export async function crearBoleta(data) {
  try {
    const res = await fetch(API_URL_CREAR_BOLETA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Error al crear Boleta");
    }
    return await res.json();
  } catch (e) {
    console.error("Error al crear boleta: ", e);
  }
}

export async function obtenerCatalogoEquipos() {
  try {
    const res = await fetch("http://localhost:3000/api/equiposCatalogo");
    if (!res.ok) {
      throw new Error("Error al obtener los equipos");
    }
    return await res.json();
  } catch (e) {
    console.error("error en Obtener los equipos de server: ", e.message);
    throw e;
  }
}

export async function obtenerBoletas() {
  try {
    const res = await fetch("");
    if (!res.ok) {
      throw new Error("Error al obtener las boletas");
    }
    return await res.json();
  } catch (e) {
    console.error("Error al generar la peticion", e);
    throw e;
  }
}

export async function buscarBoletas(query) {
  try {
    const res = await fetch(
      `${API_URL_BUSCAR_BOLETA}?query=${encodeURIComponent(query)}`
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Error al buscar boletas");
    }
    return await res.json();
  } catch (e) {
    console.error("Error en buscar boleta", e);
    throw e;
  }
}
