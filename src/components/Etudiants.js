import React, { useState, useEffect } from "react";

function Etudiants() {
  const [std, setStd] = useState([]);
  const [fstname, setFstname] = useState("");
  const [lstname, setLstname] = useState("");
  const [addr, setAddr] = useState("");
  const [cities, setCities] = useState("");

  useEffect(() => {
    fetch("http://localhost:8090/api/v1/students/student_list",
      {    
        method: 'GET',            
      })
      .then((response) => response.json())
      .then((data) => {setStd(data); console.log(data)})
  }, []);

  const ajouterEtudiant = () => {
    fetch("http://localhost:8090/api/v1/students/student_add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({firstname: fstname, lastname: lstname, address: addr, city: cities }),
    })
      .then((response) => response.json())
      .then((data) => {setStd([...std, data]); console.log(data)});
    setFstname("");
    setLstname("");
    setAddr("");
    setCities("");
  };

  const supprimerEtudiant = (id) => {
    fetch(`http://localhost:8090/api/v1/students/${id}`, {
      method: "DELETE"
      
      })
      .then(() => setStd(std.filter((etudiant) => etudiant.idStudent !== id)));
  };

  return (
    <div>
      <h1>Gestion des Étudiants</h1>
      <ul>
        {std.map((student) => (
          <li key={student.idStudent}>
            {student.firstname} {student.lastname}
            <button onClick={() => supprimerEtudiant(student.idStudent)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="firstname"
        value={fstname}
        onChange={(e) => setFstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="lastname"
        value={lstname}
        onChange={(e) => setLstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="address"
        value={addr}
        onChange={(e) => setAddr(e.target.value)}
      />
      <input
        type="text"
        placeholder="city"
        value={cities}
        onChange={(e) => setCities(e.target.value)}
      />      
      <button onClick={ajouterEtudiant}>Ajouter</button>      
    </div>
  );
}

export default Etudiants;