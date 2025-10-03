// boletasServices.js (CÓDIGO CORREGIDO)
const API_URL_CREAR_BOLETA = "http://localhost:3000/api/crearBoleta";
// 💡 CORREGIDO: Cambiamos la ruta a '/api/buscarBoletas' (plural) para resolver el 404
const API_URL_BUSCAR_BOLETAS = "http://localhost:3000/api/buscarBoleta";

// Nota: Las otras funciones (crearBoleta, obtenerCatalogoEquipos, obtenerBoletas)
// permanecen sin cambios.

export async function buscarBoletas(params) {
  try {
    // 1. Convertir el objeto de parámetros (params) en una query string
    // Ejemplo: { query: 'x', sort: 'desc' } => "query=x&sort=desc..."
    const queryString = new URLSearchParams(params).toString();

    // 2. Usar la API_URL_BUSCAR_BOLETAS corregida y añadir la query string
    const url = `${API_URL_BUSCAR_BOLETAS}?${queryString}`;

    const res = await fetch(url);

    if (!res.ok) {
      // Intentamos parsear el error para mejor diagnóstico
      try {
        const err = await res.json();
        throw new Error(
          err.message || `Error al buscar boletas (HTTP ${res.status})`
        );
      } catch (e) {
        // Si falla el .json() (ej. el error es HTML o texto plano), lanzamos el error de estado
        throw new Error(`Error al buscar boletas: HTTP ${res.status}`);
      }
    }

    return await res.json();
  } catch (e) {
    console.error("Error en buscar boleta:", e.message);
    // Lanzamos el error para que el componente React pueda manejar el setLoading(false)
    throw e;
  }
}

// =========================================================================
// MANTENIENDO LAS FUNCIONES ORIGINALES RESTANTES
// =========================================================================

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
