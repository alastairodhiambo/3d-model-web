import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import ProjectInput from "./ProjectInput";

export default function Data() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("projects").onSnapshot((snapshot) => {
      const projectsData = [];
      snapshot.forEach((doc) => {
        projectsData.push({ ...doc.data(), id: doc.id });
      });
      setProjects(projectsData);
    });
  }, []);

  const onCreate = () => {
    if (newProjectName !== "") {
      const db = firebase.firestore();
      db.collection("projects").add({ name: newProjectName });
      setNewProjectName("");
    }
  };

  return (
    <ul>
      <input
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <button onClick={onCreate}>Create</button>
      {projects.map((project, index) => (
        <li key={index}>
          <ProjectInput project={project} />
        </li>
      ))}
    </ul>
  );
}
