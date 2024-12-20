import Etudiants from "./components/Etudiants";
import Cours from "./components/Cours";
import Notes from "./components/Notes";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container-fluid">        
        <Navbar />
        <Routes>
          <Route path="/etudiants" element={<Etudiants />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
