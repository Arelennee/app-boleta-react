import { useState } from "react";
import BoletaForm from "../components/BoletaForm";

export default function BoletaPage() {
  const [boletaCreada, setBoletaCreada] = useState(null);

  const handleBoletaCreada = (data) => {
    setBoletaCreada(data);
  };
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Crear Boleta Proforma</h1>

      {/* Formulario */}
      <BoletaForm onBoletaCreada={handleBoletaCreada} />

      {/* Resultado al crear boleta */}
      {boletaCreada && (
        <div className="mt-6 border rounded p-4">
          <h2 className="text-lg font-semibold">Boleta creada:</h2>
          <p>
            <strong>ID:</strong> {boletaCreada.id_boleta}
          </p>
          <p>
            <strong>Subtotal:</strong> {boletaCreada.subtotal}
          </p>
          <p>
            <strong>Total:</strong> {boletaCreada.total}
          </p>
          <p className="text-green-600 font-semibold">{boletaCreada.message}</p>
        </div>
      )}
    </div>
  );
}
