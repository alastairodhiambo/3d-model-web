import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../firebase";

export default function UploadModel({ currentModel }) {
  const [file, setFile] = useState(null);
  const [modelName, setModelName] = useState("");
  let history = useHistory();

  /****  Updating the model name  ****/
  const onModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const onUpdateModelName = () => {
    if (!modelName) {
      return;
    }
    db.collection("models").doc(currentModel).update({
      name: modelName,
    });
    setModelName("");
  };
  /***********/

  /****  Uploading the file  ****/
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    const storageRef = storage.ref().child("models");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    db.collection("models")
      .doc(currentModel)
      .update({
        image: await fileRef.getDownloadURL(),
      });
  };
  /***********/

  /****  Delete the model  ****/
  const onDelete = () => {
    db.collection("models").doc(currentModel).delete();
    history.push("/models");
  };
  /***********/

  return (
    <div className="edit-model-info">
      <div>
        <input value={modelName} onChange={onModelNameChange} type="text" />
        <button onClick={onUpdateModelName}>Update model name</button>
      </div>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onUpload}>Upload image</button>
      </div>
      <div>
        <button onClick={onDelete}>Delete Model</button>
      </div>
    </div>
  );
}
