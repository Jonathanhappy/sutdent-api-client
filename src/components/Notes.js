import React, { useState, useEffect } from "react";
import { monthList } from "../datas/monthList";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [sdt, setSdt] = useState([]);
  const [cours, setCours] = useState([]);
  const [sdtId, setSdtId] = useState("");
  const [coursId, setCoursId] = useState("");
  const [note, setNote] = useState("");
  const [session, setSession] = useState("");

  useEffect(() => {
    fetch("http://localhost:8090/api/v1/result/result_list")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });

    fetch("http://localhost:8090/api/v1/students/student_list")
      .then((response) => response.json())
      .then((data) => setSdt(data));

    fetch("http://localhost:8090/api/v1/courses/course_list")
      .then((response) => response.json())
      .then((data) => setCours(data));
  }, []);

  const ajouterNote = () => {
    fetch("http://localhost:8090/api/v1/result/result_add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idStudent: sdtId,
        idCourse: coursId,
        session: session,
        mark: note,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes([...notes, data]);
        console.log(data);
      });
    setSdtId("");
    setCoursId("");
    setSession("");
    setNote("");
  };

  const supprimerNote = (id) => {
    fetch(`http://localhost:8090/api/v1/result/${id}`, {
      method: "DELETE",
    }).then(() => setNotes(notes.filter((note) => note.idResult !== id)));
  };

  return (
    <div>
      <h1 className="text-center text-primary my-5">Gestion des Notes</h1>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center h-100 w-100">
          <table className="table table-striped table-hover table-bordered table-dark table-sm col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-center ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Etudiant</th>
                <th scope="col">Cours</th>
                <th scope="col">Note</th>
                <th scope="col">Session</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr>
                  <th scope="row" key={note.idResult}>
                    {note.idResult}
                  </th>
                  <td>{note.student.firstname}</td>
                  <td>{note.course.courseName}</td>
                  <td>{note.mark}</td>
                  <td>{note.session}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => supprimerNote(note.idResult)}
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

      <h1 className="text-center text-primary my-5">Ajouter une note</h1>
      <form
        className="container-fluid col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5"
        onSubmit={ajouterNote}
      >
        <div class="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setSdtId(e.target.value)}
            value={sdtId}
          >
            <option value={""}>Sélectionnez un étudiant</option>
            {sdt.map((student) => (
              <option key={student.idStudent} value={student.idStudent}>
                {student.firstname}
              </option>
            ))}
          </select>
        </div>
        <div class="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setCoursId(e.target.value)}
            value={coursId}
          >
            <option value={""}>Sélectionnez un cours</option>
            {cours.map((cour) => (
              <option key={cour.idCourse} value={cour.idCourse}>
                {cour.courseName}
              </option>
            ))}
          </select>
        </div>
        <div class="mb-3">
          <label for="note" class="form-label">
            Note
          </label>
          <input
            type="number"
            class="form-control"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setSession(e.target.value)}
            value={session}
          >
            <option value={""}>Sélectionnez un étudiant</option>
            {monthList.map((mois) => (
              <option key={mois.id} value={mois.name}>
                {mois.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Notes;
