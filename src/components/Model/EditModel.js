import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../firebase";

export default function UploadModel({ currentModel, name }) {
  const [file, setFile] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [modelName, setModelName] = useState(name);
  let history = useHistory();
  const storageRef = storage.ref().child("models");

  /****  Updating the model name  ****/
  const onModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const onUpdateModelName = () => {
    if (!modelName || modelName === name) {
      return;
    }
    console.log("ran");
    db.collection("models").doc(currentModel).update({
      name: modelName,
    });
  };
  /***********/

  /****  Uploading the image file  ****/
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      return;
    }
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    db.collection("models")
      .doc(currentModel)
      .update({
        image: await fileRef.getDownloadURL(),
      });
  };
  /***********/

  /****  Uploading the model file  ****/
  const onModelFileChange = (e) => {
    setModelFile(e.target.files[0]);
  };

  const onModelUpload = async () => {
    if (!modelFile) {
      return;
    }
    const modelFileRef = storageRef.child(file?.name);
    await modelFileRef.put(modelFile);
    db.collection("models")
      .doc(currentModel)
      .update({
        model: await modelFileRef.getDownloadURL(),
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
        <input type="file" onChange={onModelFileChange} />
        <button onClick={onModelUpload}>Upload model</button>
      </div>
      <div>
        <button onClick={onDelete}>Delete Model</button>
      </div>
    </div>
  );
}
