import { memo } from 'react';

const AtencionDetails = ({ formData, trabajadores, handleChange, handleSelectTrabajador }) => {
  return (
    <div className="flex flex-row gap-2.5 justify-center p-3">
      <div className="flex flex-col flex-4/12 gap-5">
        <div>
          <label htmlFor="trabajador-select" className="sr-only">Seleccionar trabajador</label>
          <select
            id="trabajador-select"
            onChange={handleSelectTrabajador}
            value={formData.atendido_por}
            className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full"
          >
            <option value="">Seleccionar trabajador</option>
            {trabajadores.map((trabajador, index) => (
              <option key={trabajador.nombre || index} value={trabajador.nombre}>
                {trabajador.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="atendido_por" className="sr-only">Atendido por</label>
          <input
            type="text"
            id="atendido_por"
            name="atendido_por"
            placeholder="Atendido por"
            value={formData.atendido_por}
            className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full"
            readOnly
          />
        </div>
      </div>
      <div className="flex flex-col flex-8/12">
        <label htmlFor="observaciones" className="sr-only">Observaciones</label>
        <textarea
          id="observaciones"
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="border p-1 min-h-32 w-full rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150"
        />
      </div>
    </div>
  );
};

export default memo(AtencionDetails);
