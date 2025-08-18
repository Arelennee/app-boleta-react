// components/BoletaForm.jsx
import React, { useState, useEffect } from "react";
import { crearBoleta } from "../services/boletasServices.js";
import obtenerTrabajadores from "../services/trabajadoresServices.js";
import EquipoForm from "./EquipoForm.jsx";

const BoletaForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cliente_nombre: "",
    cliente_dni: "",
    cliente_ruc: "",
    atendido_por: "",
    dni_atiende: "",
    observaciones: "",
    equipos: [],
  });

  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const data = await obtenerTrabajadores();
        setTrabajadores(data);
      } catch (err) {
        console.error("Error cargando trabajadores:", err);
      }
    };
    fetchTrabajadores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectTrabajador = (e) => {
    const dniSeleccionado = e.target.value;
    const trabajador = trabajadores.find((t) => t.dni === dniSeleccionado);

    if (trabajador) {
      setFormData({
        ...formData,
        atendido_por: trabajador.nombre,
        dni_atiende: trabajador.dni,
      });
    }
  };

  const handleAddEquipo = (equipo) => {
    setFormData({
      ...formData,
      equipos: [...formData.equipos, equipo],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await crearBoleta(formData);
      if (onSubmit) onSubmit(result);
    } catch (err) {
      console.error("Error creando boleta:", err);
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
      <select onChange={handleSelectTrabajador} className="border p-2 w-full">
        <option value="">Seleccionar trabajador</option>
        {trabajadores.map((trabajador) => (
          <option key={trabajador.dni} value={trabajador.dni}>
            {trabajador.nombre} - {trabajador.dni}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="atendido_por"
        placeholder="Atendido por"
        value={formData.atendido_por}
        onChange={handleChange}
        className="border p-2 w-full"
        readOnly
      />
      <input
        type="text"
        name="dni_atiende"
        placeholder="DNI de quien atiende"
        value={formData.dni_atiende}
        onChange={handleChange}
        className="border p-2 w-full"
        readOnly
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
