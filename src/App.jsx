import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoletaForm from "./components/BoletaForm.jsx";
import BoletaSearch from "./pages/BoletaSearch.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoletaForm />} />
        <Route path="/Buscar" element={<BoletaSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
