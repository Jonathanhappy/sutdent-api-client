import React, { useState, useEffect } from "react";

function Etudiants() {
  const [std, setStd] = useState([]);
  const [fstname, setFstname] = useState("");
  const [lstname, setLstname] = useState("");
  const [addr, setAddr] = useState("");
  const [cities, setCities] = useState("");

  useEffect(() => {
    fetch("http://localhost:8090/api/v1/students/student_list", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setStd(data);
        console.log(data);
      });
  }, []);

  const ajouterEtudiant = () => {
    fetch("http://localhost:8090/api/v1/students/student_add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: fstname,
        lastname: lstname,
        address: addr,
        city: cities,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStd([...std, data]);
        console.log(data);
      });
    setFstname("");
    setLstname("");
    setAddr("");
    setCities("");
  };

  const supprimerEtudiant = (id) => {
    fetch(`http://localhost:8090/api/v1/students/${id}`, {
      method: "DELETE",
    }).then(() => setStd(std.filter((etudiant) => etudiant.idStudent !== id)));
  };

  return (
    <div>
      <h1 className="text-center text-primary my-5">Gestion des Étudiants</h1>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center h-100 w-100">
          <table className="table table-striped table-hover table-bordered table-dark table-sm col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-center ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Addesse</th>
                <th scope="col">City</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {std.map((student) => (
                <tr>
                  <th scope="row" key={student.idStudent}>
                  {student.idStudent}
                  </th>
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.address}</td>
                  <td>{student.city}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => supprimerEtudiant(student.idStudent)}
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

      <h1 className="text-center text-primary my-5">Ajouter un Étudiant</h1>
      <form className="container-fluid col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5" onSubmit={ajouterEtudiant}>
        <div class="mb-3">
          <label for="firstname" class="form-label">
            firstname 
          </label>
          <input
            type="text"
            class="form-control"
            id="firstname"
            value={fstname}
            onChange={(e) => setFstname(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="lastname" class="form-label">
            lastname
          </label>
          <input
            type="text"
            class="form-control"
            id="lastname"            
            value={lstname}
            onChange={(e) => setLstname(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">
            Addesse
          </label>
          <input
            type="text"
            class="form-control"
            id="address"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">
            City
          </label>
          <input
            type="text"
            class="form-control"
            id="city"
            value={cities}
            onChange={(e) => setCities(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>  
    </div>
  );
}

export default Etudiants;
