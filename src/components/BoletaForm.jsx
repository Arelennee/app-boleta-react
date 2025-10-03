import { useState, useEffect } from "react";
import { crearBoleta } from "../services/boletasServices.js";
import obtenerTrabajadores from "../services/trabajadoresServices.js";
import EquipoForm from "./EquipoForm.jsx";

const INITIAL_FORM_STATE = {
  cliente_nombre: "",
  cliente_dni: "",
  cliente_ruc: "",
  cliente_cel: "",
  atendido_por: "",
  observaciones: "",
  equipos: [],
};

const BoletaForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
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
    const nombreSeleccionado = e.target.value;
    if (nombreSeleccionado) {
      setFormData({
        ...formData,
        atendido_por: nombreSeleccionado,
      });
    } else {
      setFormData({
        ...formData,
        atendido_por: "",
      });
    }
  };

  const handleAddEquipo = (equipo) => {
    setFormData({
      ...formData,
      equipos: [...formData.equipos, equipo],
    });
  };

  const handleRemoveEquipo = (indexToRemove) => {
    const updatedEquipos = formData.equipos.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({
      ...formData,
      equipos: updatedEquipos,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.cliente_nombre ||
      !formData.cliente_cel ||
      !formData.atendido_por
    ) {
      alert(
        "Por favor, complete los campos necesarios (Nombre, Celular, y Personal que Atiende)"
      );
      return;
    }
    if (!formData.equipos || formData.equipos.length === 0) {
      alert(
        "Debe añadir almenos un equipo y servicio para poder generar la boleta"
      );
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        dni_atiende: undefined,
        cliente_dni: formData.cliente_dni || null,
        cliente_ruc: formData.cliente_ruc || null,
      };
      delete dataToSend.dni_atiende;

      const result = await crearBoleta(dataToSend);

      if (onSubmit) onSubmit(result);

      if (result?.pdfUrl) {
        const pdfFullUrl = `http://localhost:3000/${result.pdfUrl}`;
        window.open(pdfFullUrl, "_blank");
      }

      setFormData(INITIAL_FORM_STATE);
      alert("Boleta creada con éxito y formulario reseteado.");
    } catch (err) {
      console.error("Error creando boleta:", err);
      alert("Error al crear la boleta. Revise la consola para más detalles.");
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
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-zinc-300"
          id="formulario"
        >
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
                placeholder="DNI del cliente (opcional)"
                value={formData.cliente_dni}
                onChange={handleChange}
                className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full "
              />
            </div>
            <div>
              <input
                type="text"
                name="cliente_cel"
                placeholder="Celular del cliente"
                value={formData.cliente_cel}
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
                value={formData.atendido_por}
                className="border p-2 rounded-lg bg-zinc-100 hover:bg-zinc-50 duration-150 w-full "
              >
                <option value="">Seleccionar trabajador</option>
                {trabajadores.map((trabajador, index) => (
                  <option
                    key={trabajador.nombre || index}
                    value={trabajador.nombre}
                  >
                    {trabajador.nombre}
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
            </div>
            <div className="flex flex-col flex-8/12">
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
              <EquipoForm onAddEquipo={handleAddEquipo} />
            </div>
            <div className="flex flex-col flex-7/12">
              <div className="text-center">
                <h3 className="font-semibold">Equipos agregados:</h3>
                {formData.equipos.length === 0 && (
                  <p>No hay equipos agregados.</p>
                )}
                {formData.equipos.map((eq, index) => (
                  <div
                    key={index}
                    className="border p-2 mt-2 flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Equipo:</strong> {eq.nombre_equipo}
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
                    <button
                      type="button"
                      onClick={() => handleRemoveEquipo(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
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
