import { useState, useEffect } from "react";
import { buscarBoletas } from "../services/boletasServices.js";

// Tiempo de espera para ejecutar la búsqueda (ej. 300ms)
const DEBOUNCE_DELAY = 300;

export default function BoletaSearch() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    sort: "desc",
    limite: 10,
    desde: "",
    hasta: "",
    page: 1,
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para manejar la búsqueda REAL (sin cambios)
  const fetchBoletas = async (searchQuery, searchFilters) => {
    setLoading(true);
    try {
      const params = {
        query: searchQuery,
        ...searchFilters,
      };

      const data = await buscarBoletas(params);
      setResults(data);
    } catch (error) {
      console.error("Error al buscar boletas:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Lógica de Debounce (sin cambios)
  useEffect(() => {
    const { sort, limite, desde, hasta } = filters;

    if (!query.trim()) {
      fetchBoletas("", filters);
      return;
    }

    const handler = setTimeout(() => {
      fetchBoletas(query, filters);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [query, filters]);

  // Maneja la búsqueda explícita (clic en botón) (sin cambios)
  const handleSearchExplicit = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchBoletas(query, filters);
  };

  // Maneja cambios en filtros (sin cambios)
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [name]: value,
        page: 1,
      };

      return newFilters;
    });
  };

  // Función de paginación (sin cambios)
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    fetchBoletas(query, { ...filters, page: newPage });
  };

  return (
    <div className="h-full w-full flex items-center flex-col p-4">
      <h1>Búsqueda de Boletas Flexible</h1>
      <form onSubmit={handleSearchExplicit} className="w-full max-w-4xl">
        {/* ... (Filtros y barra de búsqueda sin cambios) ... */}
        <div className="flex flex-row gap-2.5 mb-4 items-center">
          <input
            type="text"
            placeholder="Ingrese DNI, nombre, número de boleta o total..."
            className="bg-zinc-100 p-3 w-full rounded-md hover:bg-zinc-300 hover:duration-150"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="block p-3 bg-cyan-600 text-white rounded-md cursor-pointer hover:bg-cyan-700 duration-150"
          >
            Buscar
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6 p-3 bg-zinc-100 rounded-md">
          <label className="flex flex-col text-sm">
            Fecha Desde:
            <input
              type="date"
              name="desde"
              value={filters.desde}
              onChange={handleFilterChange}
              className="p-1 border rounded"
            />
          </label>
          <label className="flex flex-col text-sm">
            Fecha Hasta:
            <input
              type="date"
              name="hasta"
              value={filters.hasta}
              onChange={handleFilterChange}
              className="p-1 border rounded"
            />
          </label>

          <label className="flex flex-col text-sm">
            Ordenar por Fecha:
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="p-1 border rounded"
            >
              <option value="desc">Más Reciente</option>
              <option value="asc">Más Antigua</option>
            </select>
          </label>

          <label className="flex flex-col text-sm">
            Resultados por Página:
            <input
              type="number"
              name="limite"
              value={filters.limite}
              onChange={handleFilterChange}
              className="p-1 border rounded w-20"
              min="1"
            />
          </label>
        </div>
      </form>

      {/* Contenedor de Resultados */}
      <div className="w-full max-w-4xl mt-4">
        {loading && (
          <p className="text-blue-600 font-semibold">Cargando resultados...</p>
        )}

        {!loading && results.length > 0 && (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b-2">Tipo</th>
                <th className="p-3 border-b-2">Nº Boleta</th>
                <th className="p-3 border-b-2">Cliente</th>
                <th className="p-3 border-b-2">DNI de Cliente</th>{" "}
                {/* 💡 DNI SEPARADO */}
                <th className="p-3 border-b-2">RUC de Cliente</th>{" "}
                {/* 💡 RUC SEPARADO */}
                <th className="p-3 border-b-2">Total</th>
                <th className="p-3 border-b-2">Ver Pdf</th>
              </tr>
            </thead>
            <tbody>
              {results.map((boleta) => (
                <tr
                  key={boleta.id_boleta}
                  className="hover:bg-gray-50 text-center"
                >
                  <td className="p-3 border-b">{boleta.tipo}</td>
                  <td className="p-3 border-b font-mono">
                    {boleta.numero_boleta}
                  </td>
                  <td className="p-3 border-b">{boleta.cliente_nombre}</td>
                  {/* 💡 CONTENIDO DE DNI SEPARADO */}
                  <td className="p-3 border-b">
                    {boleta.cliente_dni || "N/A"}
                  </td>
                  {/* 💡 CONTENIDO DE RUC SEPARADO */}
                  <td className="p-3 border-b">
                    {boleta.cliente_ruc || "N/A"}
                  </td>
                  <td className="p-3 border-b font-semibold text-green-700">
                    S/. {parseFloat(boleta.total).toFixed(2)}
                  </td>
                  <td className="p-3 border-b">
                    {boleta.pdfUrlCompleta ? (
                      <a
                        href={boleta.pdfUrlCompleta}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Ver PDF
                      </a>
                    ) : (
                      "No disponible"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && results.length === 0 && (
          <p className="text-gray-500 p-4 border rounded">
            No se encontraron boletas para la búsqueda actual.
          </p>
        )}

        {/* Componente de Paginación Simple (sin cambios) */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page <= 1}
            className="p-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="p-2">Página {filters.page}</span>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            className="p-2 bg-gray-300 rounded"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
