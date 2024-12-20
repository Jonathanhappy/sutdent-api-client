import React, { useState, useEffect } from "react";

function Cours() {
  const [cours, setCours] = useState([]);
  const [titre, setTitre] = useState("");
  const [credit, setCredit] = useState("");

  useEffect(() => {
    fetch("http://localhost:8090/api/v1/courses/course_list",
      {    
        method: 'GET',            
      })
      .then((response) => response.json())
      .then((data) => {setCours(data); console.log(data)})
  }, []);

  const ajouterCour = () => {
    fetch("http://localhost:8090/api/v1/courses/course_add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({courseName: titre, creditNumber: credit}),
    })
      .then((response) => response.json())
      .then((data) => {setCours([...cours, data]); console.log(data)});
    setTitre("");
    setCredit("");
  };

  const supprimerCour = (id) => {
    fetch(`http://localhost:8090/api/v1/courses/${id}`, {
      method: "DELETE"      
      })
      .then(() => setCours(cours.filter((cour) => cour.idCourse !== id)));
  };

  return (
    <div>
      <h1>Gestion des Cours</h1>
      <ul>
        {cours.map((course) => (
          <li key={course.idCourse}>
            {course.courseName} {course.creditNumber}
            <button onClick={() => supprimerCour(course.idCourse)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <input
        type="number"
        placeholder="credit"
        value={credit}
        onChange={(e) => setCredit(e.target.value)}
      />   
      <button onClick={ajouterCour}>Ajouter</button>      
    </div>
  );
}

export default Cours;