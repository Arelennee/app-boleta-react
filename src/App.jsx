import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BoletaForm from "./components/BoletaForm.jsx";
import BoletaSearch from "./pages/BoletaSearch.jsx";

function App() {
  return (
    <Router>
      <nav className="flex p-4 items-center justify-center bg-gray-800 text-white gap-4">
        <Link to="/" className="hover:text-gray-300">Crear Boleta</Link>
        <Link to="/Buscar" className="hover:text-gray-300">Buscar Boleta</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BoletaForm />} />
        <Route path="/Buscar" element={<BoletaSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
