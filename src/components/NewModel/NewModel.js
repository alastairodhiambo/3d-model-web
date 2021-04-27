import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { useHistory } from "react-router-dom";

import "./NewModel.scss";

export default function NewModelForm() {
  const [modelName, setModelName] = useState("");
  const [file, setFile] = useState(null);
  const [fileRef, setFileRef] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [modelFileRef, setModelFileRef] = useState(null);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const storageRef = storage.ref().child("models");

  const onModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const onFileChange = async (e) => {
    setFile(e.target?.files[0]);
    setFileRef(storageRef.child(e.target?.files[0].name));
  };

  const onModelFileChange = async (e) => {
    setModelFile(e.target?.files[0]);
    setModelFileRef(storageRef.child(e.target?.files[0].name));
  };

  const onModelCreate = async () => {
    if (!modelName || !file) {
      return;
    }
    setLoading(true);

    await fileRef.put(file);
    await modelFileRef.put(modelFile);

    db.collection("models")
      .doc()
      .set({
        name: modelName,
        image: await fileRef.getDownloadURL(),
        model: await modelFileRef.getDownloadURL(),
      });
    setModelName("");
    setLoading(false);
    history.push("/models");
  };

  if (loading === true && file !== null) {
    return (
      <>
        <p>Creating Model...</p>
      </>
    );
  } else if (loading === true) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <div className="create-model">
      <div>
        <input value={modelName} onChange={onModelNameChange} type="text" />
      </div>
      <div>
        <label htmlFor="image-file">Image File</label>
        <input id="image-file" type="file" onChange={onFileChange} />
      </div>
      <div>
        <label htmlFor="model-file">Model File</label>
        <input id="model-file" type="file" onChange={onModelFileChange} />
      </div>
      <button id="create-model" onClick={onModelCreate}>
        Create model
      </button>
    </div>
  );
}
