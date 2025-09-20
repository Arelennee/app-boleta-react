import { useState, useEffect } from "react";
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

  // Cargar los equipos del catálogo al montar el componente
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

  // Agregar un servicio a la lista temporal
  const handleAddServicio = () => {
    if (servicio.nombre_servicio && servicio.precio_servicio) {
      setEquipo({
        ...equipo,
        servicios: [...equipo.servicios, servicio],
      });
      setServicio({ nombre_servicio: "", precio_servicio: "" });
    }
  };

  // Eliminar un servicio por su índice en la lista
  const handleRemoveServicio = (indexToRemove) => {
    const nuevosServicios = equipo.servicios.filter(
      (_, index) => index !== indexToRemove
    );
    setEquipo({
      ...equipo,
      servicios: nuevosServicios,
    });
  };

  // Agregar el equipo completo al componente padre
  const handleAddEquipo = () => {
    if (equipo.id_equipo_catalogo && equipo.servicios.length > 0) {
      const idSeleccionado = Number(equipo.id_equipo_catalogo);
      // Buscar el objeto del equipo completo en el catálogo para obtener su nombre
      const equipoSeleccionado = equiposCatalogo.find(
        (eq) => eq.id_equipo_catalogo === idSeleccionado
      );

      // Crear un nuevo objeto de equipo con el nombre antes de enviarlo
      const equipoConNombre = {
        ...equipo,
        nombre_equipo: equipoSeleccionado
          ? equipoSeleccionado.nombre_equipo
          : "Nombre no encontrado",
      };

      // Enviar el nuevo objeto al componente padre
      onAddEquipo(equipoConNombre);

      // Reiniciar el estado del formulario para un nuevo registro
      setEquipo({
        id_equipo_catalogo: "",
        descripcion_equipo: "",
        servicios: [],
      });
    }
  };

  return (
    <div className="space-y-2 p-2.5 rounded">
      {/* Dropdown de catálogo */}
      <select
        value={equipo.id_equipo_catalogo}
        onChange={(e) =>
          setEquipo({ ...equipo, id_equipo_catalogo: e.target.value })
        }
        className="border p-2 w-full"
      >
        <option value="">Seleccionar equipo</option>
        {equiposCatalogo &&
          Array.isArray(equiposCatalogo) &&
          equiposCatalogo.map((eq) => (
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

      {/* Formulario de servicios */}
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
        <div className="flex flex-row">
          <div>
            <button
              type="button"
              onClick={handleAddServicio}
              className="block p-1 bg-cyan-300 rounded-lg cursor-pointer"
            >
              Agregar Servicio
            </button>
          </div>
          <div>
            {/* Lista de servicios agregados con botón de eliminar */}
            <ul className="list-disc pl-5">
              {equipo.servicios.map((srv, index) => (
                <li key={index}>
                  {srv.nombre_servicio} - S/. {srv.precio_servicio}
                  <button
                    type="button"
                    onClick={() => handleRemoveServicio(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddEquipo}
              className="block p-1 bg-green-300 rounded-lg cursor-pointer"
            >
              Agregar Equipo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipoForm;
