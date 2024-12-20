import React, { useState, useEffect } from "react";

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
      .then((data) => {setNotes(data)});

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
      body: JSON.stringify({ idStudent: sdtId , idCourse: coursId, session: session, mark: note }),
    })
      .then((response) => response.json())
      .then((data) => {setNotes([...notes, data]); console.log(data)});
    setSdtId("");
    setCoursId("");
    setSession("");
    setNote("");
    
  };

  const supprimerNote = (id) => {
    fetch(`http://localhost:8090/api/v1/result/${id}`, { method: "DELETE" })
      .then(() => setNotes(notes.filter((note) => note.idResult !== id)));
  };

  return (
    <div>
      <h1>Gestion des Notes</h1>
      <select onChange={(e) => setSdtId(e.target.value)} value={sdtId}>
        <option value={""} >Sélectionnez un étudiant</option>
        {sdt.map((student) => (
          <option key={student.idStudent} value={student.idStudent}>
            {student.firstname}
          </option>
        ))}
      </select>
      <select onChange={(e) => setCoursId(e.target.value)} value={coursId}>
        <option value={""}>Sélectionnez un cours</option>
        {cours.map((cour) => (
          <option key={cour.idCourse} value={cour.idCourse}>
            {cour.courseName}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="text"
        placeholder="session"
        value={session}
        onChange={(e) => setSession(e.target.value)}
      />
      <button onClick={ajouterNote}>Ajouter</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id_result}>
            Étudiant: {note.student.firstname}, Cours: {note.course.courseName}, Note: {note.mark}, Session: {note.session}
            <button onClick={() => supprimerNote(note.idResult)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;