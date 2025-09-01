import { useState } from "react";
import { buscarBoletas } from "../services/boletasServices.js";

export default function BoletaSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const data = await buscarBoletas(query);
    setResults(data);
  };
  return (
    <div>
      <h1>Busqueda de Boletas</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ingrese DNI, nombre o lo que sea"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((boleta) => (
              <li key={boleta.id_boleta}>
                {boleta.numero_boleta} - {boleta.nombre_cliente} -{" "}
                {boleta.total}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron boletas</p>
        )}
      </div>
    </div>
  );
}
