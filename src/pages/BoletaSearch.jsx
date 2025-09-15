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
    <div className="h-full w-full flex items-center flex-col">
      <div></div>
      <h1>Busqueda de Boletas</h1>
      <form onSubmit={handleSearch}>
        <div className="flex flex-row gap-2.5">
          <input
            type="text"
            placeholder="Ingrese DNI, nombre o lo que sea"
            className="bg-zinc-100 p-3 w-xs rounded-md hover:bg-zinc-300 hover:duration-150"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="block p-2 bg-cyan-300 cursor-pointer rounded-sm"
          >
            Buscar
          </button>
        </div>
      </form>

      <div>
        {results.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Tipo de Boleta</th>
                <th>Numero de Boleta</th>
                <th>Nombre de Cliente</th>
                <th>DNI de Cliente</th>
                <th>Total de Boleta</th>
              </tr>
            </thead>
            <tbody>
              {results.map((boleta) => (
                <tr key={boleta.id_boleta}>
                  <td>{boleta.tipo}</td>
                  <td>{boleta.numero_boleta}</td>
                  <td>{boleta.cliente_nombre}</td>
                  <td>{boleta.cliente_dni}</td>
                  <td>{boleta.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron boletas</p>
        )}
      </div>
    </div>
  );
}
