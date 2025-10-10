import { useState, useEffect, useCallback } from "react";
import { crearBoleta } from "../services/boletasServices.js";
import obtenerTrabajadores from "../services/trabajadoresServices.js";
import EquipoForm from "./EquipoForm.jsx";
import ClienteForm from "./ClienteForm.jsx";
import AtencionDetails from "./AtencionDetails.jsx";
import EquiposList from "./EquiposList.jsx";

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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectTrabajador = useCallback((e) => {
    const nombreSeleccionado = e.target.value;
    setFormData((prev) => ({ ...prev, atendido_por: nombreSeleccionado || "" }));
  }, []);

  const handleAddEquipo = useCallback((equipo) => {
    setFormData((prev) => ({ ...prev, equipos: [...prev.equipos, equipo] }));
  }, []);

  const handleRemoveEquipo = useCallback((indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      equipos: prev.equipos.filter((_, index) => index !== indexToRemove),
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cliente_nombre || !formData.cliente_cel || !formData.atendido_por) {
      alert("Por favor, complete los campos necesarios (Nombre, Celular, y Personal que Atiende)");
      return;
    }
    if (formData.equipos.length === 0) {
      alert("Debe añadir al menos un equipo y servicio para poder generar la boleta");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        cliente_dni: formData.cliente_dni || null,
        cliente_ruc: formData.cliente_ruc || null,
      };

      const result = await crearBoleta(dataToSend);

      if (onSubmit) onSubmit(result);

      if (result?.pdfUrl) {
        const apiHost = import.meta.env.VITE_API_HOST || 'http://localhost:3000';
        const pdfFullUrl = `${apiHost}/${result.pdfUrl}`;
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
      <div className="flex items-center justify-center bg-zinc-400">
        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-300 p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
          <ClienteForm formData={formData} handleChange={handleChange} />
          <AtencionDetails
            formData={formData}
            trabajadores={trabajadores}
            handleChange={handleChange}
            handleSelectTrabajador={handleSelectTrabajador}
          />
          <div className="flex flex-row gap-2.5">
            <div className="flex flex-col flex-5/12">
              <EquipoForm onAddEquipo={handleAddEquipo} />
            </div>
            <div className="flex flex-col flex-7/12">
              <EquiposList equipos={formData.equipos} handleRemoveEquipo={handleRemoveEquipo} />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 duration-150 font-semibold"
            >
              Crear Boleta
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default BoletaForm;