import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import UploadModel from "./UploadModel";
import { db } from "../../firebase";
import "@google/model-viewer";

export default function Model() {
  const [image, setImage] = useState("");
  const [modelName, setModelName] = useState("");

  const match = useRouteMatch("/model/:id");
  const model = match.params.id;

  useEffect(() => {
    const unmount = db
      .collection("models")
      .doc(model)
      .onSnapshot((doc) => {
        setImage(doc.data().image || "");
        setModelName(doc.data().name);
      });
    return unmount;
  }, []);

  return (
    <section className="content">
      <h1>{modelName}</h1>
      <div className="model-view">
        <img src={image} alt={image} />
        {/* <div className="model">
            <model-viewer
              src={image}
              camera-controls
              shadow-intensity="1"
            ></model-viewer>
          </div> */}
      </div>
      <UploadModel currentModel={model} />
    </section>
  );
}
