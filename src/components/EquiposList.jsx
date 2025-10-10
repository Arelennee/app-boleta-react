import { memo } from 'react';

const EquiposList = ({ equipos, handleRemoveEquipo }) => {
  return (
    <div className="text-center">
      <h3 className="font-semibold">Equipos agregados:</h3>
      {equipos.length === 0 ? (
        <p>No hay equipos agregados.</p>
      ) : (
        equipos.map((eq, index) => (
          <div
            key={index}
            className="border p-2 mt-2 flex justify-between items-center rounded-lg bg-zinc-100"
          >
            <div>
              <p>
                <strong>Equipo:</strong> {eq.nombre_equipo}
              </p>
              <p>
                <strong>Descripción:</strong> {eq.descripcion_equipo}
              </p>
              <ul className="list-disc pl-5 text-left">
                {eq.servicios.map((srv, idx) => (
                  <li key={idx}>
                    {srv.nombre_servicio} - S/. {srv.precio_servicio}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveEquipo(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 duration-150"
              aria-label={`Eliminar equipo ${eq.nombre_equipo}`}
            >
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default memo(EquiposList);
