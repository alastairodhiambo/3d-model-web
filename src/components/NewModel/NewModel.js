import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { useHistory } from "react-router-dom";

export default function NewModelForm() {
  const [modelName, setModelName] = useState("");
  const [file, setFile] = useState(null);
  const [fileRef, setFileRef] = useState(null);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const storageRef = storage.ref().child("models");

  const onModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const onFileChange = async (e) => {
    setFile(e.target.files[0]);
    setFileRef(storageRef.child(e.target.files[0].name));
  };

  const onModelCreate = async () => {
    if (!modelName || !file) {
      return;
    }
    setLoading(true);

    await fileRef.put(file);

    db.collection("models")
      .doc()
      .set({
        name: modelName,
        image: await fileRef.getDownloadURL(),
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
        <input type="file" onChange={onFileChange} />
      </div>
      <button id="create-model" onClick={onModelCreate}>
        Create model
      </button>
    </div>
  );
}
