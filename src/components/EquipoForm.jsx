// components/EquipoForm.jsx
import React, { useState, useEffect } from "react";
import getEquiposCatalogo from "../services/equiposServices";

const EquipoForm = ({ onAddEquipo }) => {
  const [equiposCatalogo, setEquiposCatalogo] = useState([]);
  const [equipo, setEquipo] = useState({
    id_equipo_catalogo: "",
    descripcion_equipo: "",
    servicios: [],
  });
  const [servicio, setServicio] = useState({
    nombre_servicio: "",
    precio_servicio: "",
  });

  // Cargar los equipos del catálogo al montar
  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const data = await getEquiposCatalogo();
        setEquiposCatalogo(data);
      } catch (error) {
        console.error("Error cargando equipos del catálogo", error);
      }
    };
    fetchEquipos();
  }, []);

  // Agregar servicio a la lista temporal
  const handleAddServicio = () => {
    if (servicio.nombre_servicio && servicio.precio_servicio) {
      setEquipo({
        ...equipo,
        servicios: [...equipo.servicios, servicio],
      });
      setServicio({ nombre_servicio: "", precio_servicio: "" });
    }
  };

  // Agregar equipo completo al padre (BoletaForm)
  const handleAddEquipo = () => {
    if (equipo.id_equipo_catalogo && equipo.servicios.length > 0) {
      onAddEquipo(equipo);
      setEquipo({
        id_equipo_catalogo: "",
        descripcion_equipo: "",
        servicios: [],
      });
    }
  };

  return (
    <div className="space-y-4 border p-4 rounded">
      {/* Dropdown de catálogo */}
      <select
        value={equipo.id_equipo_catalogo}
        onChange={(e) =>
          setEquipo({ ...equipo, id_equipo_catalogo: e.target.value })
        }
        className="border p-2 w-full"
      >
        <option value="">Seleccionar equipo</option>
        {equiposCatalogo && Array.isArray(equiposCatalogo) && equiposCatalogo.map((eq) => (
          <option key={eq.id_equipo_catalogo} value={eq.id_equipo_catalogo}>
            {eq.nombre_equipo}
          </option>
        ))}
      </select>

      {/* Descripción del equipo */}
      <input
        type="text"
        placeholder="Descripción del equipo"
        value={equipo.descripcion_equipo}
        onChange={(e) =>
          setEquipo({ ...equipo, descripcion_equipo: e.target.value })
        }
        className="border p-2 w-full"
      />

      {/* Servicios */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Nombre del servicio"
          value={servicio.nombre_servicio}
          onChange={(e) =>
            setServicio({ ...servicio, nombre_servicio: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Precio del servicio"
          value={servicio.precio_servicio}
          onChange={(e) =>
            setServicio({ ...servicio, precio_servicio: e.target.value })
          }
          className="border p-2 w-full"
        />
        <button
          type="button"
          onClick={handleAddServicio}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Agregar Servicio
        </button>
      </div>

      {/* Lista de servicios agregados */}
      <ul className="list-disc pl-5">
        {equipo.servicios.map((srv, index) => (
          <li key={index}>
            {srv.nombre_servicio} - S/. {srv.precio_servicio}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleAddEquipo}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Agregar Equipo
      </button>
    </div>
  );
};

export default EquipoForm;
