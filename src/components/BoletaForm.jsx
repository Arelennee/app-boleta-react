// components/BoletaForm.jsx
import { useState, useEffect } from "react";
import { crearBoleta } from "../services/boletasServices.js";
import obtenerTrabajadores from "../services/trabajadoresServices.js";
import "../textarea.css";
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
    if (
      !formData.cliente_nombre ||
      !formData.cliente_dni ||
      !formData.atendido_por ||
      !formData.dni_atiende
    ) {
      alert("Por favor, complete los campos necesarios");
    }
    if (!formData.equipos || formData.equipos.length === 0) {
      alert(
        "Debe añadir almenos un equipo y servicio para poder generar la boleta"
      );
    }
    try {
      const result = await crearBoleta(formData);
      if (onSubmit) onSubmit(result);
    } catch (err) {
      console.error("Error creando boleta:", err);
    }
  };

  return (
    <main>
      <nav className="flex p-2 items-center justify-center bg-zinc-300">
        <div className="flex flex-row gap-16">
          <a href="" className="block bg-purple-500 p-2 rounded-lg">
            Boleta de Venta
          </a>
          <a href="" className="block bg-purple-500 p-2 rounded-lg">
            Boleta de proforma
          </a>
        </div>
      </nav>
      <div className="flex items-center justify-center bg-zinc-400">
        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-300">
          {/* Datos del cliente */}
          <div className="flex flex-row gap-3 justify-center items-center p-4">
            <div>
              <input
                type="text"
                name="cliente_nombre"
                placeholder="Nombre del cliente"
                value={formData.cliente_nombre}
                onChange={handleChange}
                className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full "
              />
            </div>
            <div>
              <input
                type="text"
                name="cliente_dni"
                placeholder="DNI del cliente"
                value={formData.cliente_dni}
                onChange={handleChange}
                className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full "
              />
            </div>
            <div>
              <input
                type="text"
                name="cliente_ruc"
                placeholder="RUC del cliente (opcional)"
                value={formData.cliente_ruc}
                onChange={handleChange}
                className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full "
              />
            </div>
          </div>
          <div className="flex flex-row gap-2.5 justify-center p-3">
            <div className="flex flex-col flex-4/12 gap-5">
              <select
                onChange={handleSelectTrabajador}
                className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full "
              >
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
                className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full "
                readOnly
              />
              <input
                type="text"
                name="dni_atiende"
                placeholder="DNI de quien atiende"
                value={formData.dni_atiende}
                onChange={handleChange}
                className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full "
                readOnly
              />
            </div>
            <div className="flex flex-col flex-8/12">
              {/* Datos del que atiende */}
              <textarea
                name="observaciones"
                placeholder="Observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                className="border p-1 min-h-32"
                id="textAreAutoajustable"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2.5">
            <div className="flex flex-col flex-5/12">
              {/* Agregar equipos */}
              <EquipoForm onAddEquipo={handleAddEquipo} />
            </div>
            <div className="flex flex-col flex-7/12">
              {/* Mostrar lista de equipos agregados */}
              <div className="text-center">
                <h3 className="font-semibold">Equipos agregados:</h3>
                {formData.equipos.length === 0 && (
                  <p>No hay equipos agregados.</p>
                )}
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
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Crear Boleta
          </button>
        </form>
      </div>
    </main>
  );
};

export default BoletaForm;
