import React, { useState } from "react";
import { db, storage } from "../../firebase";

export default function UploadModel({ currentModel }) {
  const [file, setFile] = useState(null);
  const [modelName, setModelName] = useState("");
  console.log(currentModel);

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
    </div>
  );
}
