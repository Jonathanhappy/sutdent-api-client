import Etudiants from "./components/Etudiants";
import Cours from "./components/Cours";
import Notes from "./components/Notes";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/etudiants">Étudiants</Link></li>
            <li><Link to="/cours">Cours</Link></li>
            <li><Link to="/notes">Notes</Link></li>
          </ul>
        </nav>

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
