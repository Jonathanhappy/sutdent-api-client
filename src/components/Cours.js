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

        
      <h1 className="text-center text-primary my-5">Gestion des Cours</h1>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center h-100 w-100">
          <table className="table table-striped table-hover table-bordered table-dark table-sm col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-center ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Titre du cour</th>
                <th scope="col">Credit</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cours.map((course) => (
                <tr>
                  <th scope="row" key={course.idCourse}>
                  {course.idCourse}
                  </th>
                  <td>{course.courseName}</td>
                  <td>{course.creditNumber}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => supprimerCour(course.idCourse)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h1 className="text-center text-primary my-5">Ajouter un Cour</h1>
      <form className="container-fluid col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5" onSubmit={ajouterCour}>
        <div class="mb-3">
          <label for="titre" class="form-label">
            titre 
          </label>
          <input
            type="text"
            class="form-control"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="credit" class="form-label">
            credit
          </label>
          <input
            type="number"
            class="form-control"
            id="credit"            
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>    
    </div>
  );
}

export default Cours;