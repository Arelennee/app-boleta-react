const API_URL = `${import.meta.env.VITE_API_HOST}/api/obtenerEquipos`;

const getEquiposCatalogo = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los equipos");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error interno del server", e);
    throw e;
  }
};

export default getEquiposCatalogo;
