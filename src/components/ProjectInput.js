import React, { useState, useEffect } from "react";
import firebase from "../firebase";

export default function ProjectInput({ project }) {
  const [name, setName] = useState(project.name);

  useEffect(() => {
    setName(project.name);
  }, [project]);

  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection("projects")
      .doc(project.id)
      .set({ ...project, name });
  };

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("projects").doc(project.id).delete();
  };

  return (
    <>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}
