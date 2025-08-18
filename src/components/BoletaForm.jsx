// components/BoletaForm.jsx
import React, { useState } from "react";
import { crearBoleta } from "../services/boletasServices.js";
import EquipoForm from "./EquipoForm";

const BoletaForm = () => {
  const [formData, setFormData] = useState({
    cliente_nombre: "",
    cliente_dni: "",
    cliente_ruc: "",
    atendido_por: "",
    dni_atiende: "",
    observaciones: "",
    equipos: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // recibe equipo del hijo
  const handleAddEquipo = (equipo) => {
    setFormData({
      ...formData,
      equipos: [...formData.equipos, equipo],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await crearBoleta(formData);
      alert("Boleta creada correctamente con ID: " + response.id_boleta);
      // limpiar el form
      setFormData({
        cliente_nombre: "",
        cliente_dni: "",
        cliente_ruc: "",
        atendido_por: "",
        dni_atiende: "",
        observaciones: "",
        equipos: [],
      });
    } catch (error) {
      alert("Error al crear la boleta");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Datos del cliente */}
      <input
        type="text"
        name="cliente_nombre"
        placeholder="Nombre del cliente"
        value={formData.cliente_nombre}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="cliente_dni"
        placeholder="DNI del cliente"
        value={formData.cliente_dni}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="cliente_ruc"
        placeholder="RUC del cliente (opcional)"
        value={formData.cliente_ruc}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Datos del que atiende */}
      <input
        type="text"
        name="atendido_por"
        placeholder="Atendido por"
        value={formData.atendido_por}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="dni_atiende"
        placeholder="DNI de quien atiende"
        value={formData.dni_atiende}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="observaciones"
        placeholder="Observaciones"
        value={formData.observaciones}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Agregar equipos */}
      <EquipoForm onAddEquipo={handleAddEquipo} />

      {/* Mostrar lista de equipos agregados */}
      <div className="mt-4">
        <h3 className="font-semibold">Equipos agregados:</h3>
        {formData.equipos.length === 0 && <p>No hay equipos agregados.</p>}
        {formData.equipos.map((eq, index) => (
          <div key={index} className="border p-2 mt-2">
            <p>
              <strong>Equipo ID:</strong> {eq.id_equipo_catalogo}
            </p>
            <p>
              <strong>Descripción:</strong> {eq.descripcion_equipo}
            </p>
            <ul className="list-disc pl-5">
              {eq.servicios.map((srv, idx) => (
                <li key={idx}>
                  {srv.nombre_servicio} - S/. {srv.precio_servicio}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Crear Boleta
      </button>
    </form>
  );
};

export default BoletaForm;
