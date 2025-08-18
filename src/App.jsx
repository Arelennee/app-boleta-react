import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoletaForm from "./components/BoletaForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoletaForm />} />
      </Routes>
    </Router>
  );
}

export default App;
