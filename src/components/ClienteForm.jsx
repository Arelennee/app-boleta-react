import { memo } from "react";

const ClienteForm = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-row gap-3 justify-center items-center p-4">
      <div>
        <label htmlFor="cliente_nombre" className="sr-only">Nombre del cliente</label>
        <input
          type="text"
          id="cliente_nombre"
          name="cliente_nombre"
          placeholder="Nombre del cliente"
          value={formData.cliente_nombre}
          onChange={handleChange}
          className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="cliente_dni" className="sr-only">DNI del cliente</label>
        <input
          type="text"
          id="cliente_dni"
          name="cliente_dni"
          placeholder="DNI del cliente (opcional)"
          value={formData.cliente_dni}
          onChange={handleChange}
          className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full"
        />
      </div>
      <div>
        <label htmlFor="cliente_cel" className="sr-only">Celular del cliente</label>
        <input
          type="text"
          id="cliente_cel"
          name="cliente_cel"
          placeholder="Celular del cliente"
          value={formData.cliente_cel}
          onChange={handleChange}
          className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="cliente_ruc" className="sr-only">RUC del cliente</label>
        <input
          type="text"
          id="cliente_ruc"
          name="cliente_ruc"
          placeholder="RUC del cliente (opcional)"
          value={formData.cliente_ruc}
          onChange={handleChange}
          className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full"
        />
      </div>
    </div>
  );
};

export default memo(ClienteForm);
