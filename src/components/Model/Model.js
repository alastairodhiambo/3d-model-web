import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import EditModel from "./EditModel";
import { db } from "../../firebase";
import "@google/model-viewer";

export default function Model() {
  const [image, setImage] = useState("");
  const [modelName, setModelName] = useState("");
  const [valid, setValid] = useState(null);

  const match = useRouteMatch("/model/:id");
  const model = match.params.id;

  useEffect(() => {
    const unmount = db
      .collection("models")
      .doc(model)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setImage(doc.data()?.image || "");
          setModelName(doc.data()?.name);
          setValid(true);
        } else {
          setValid(false);
        }
      });
    // setLoading(false);
    return unmount;
  }, []);

  if (valid) {
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
        <EditModel currentModel={model} />
      </section>
    );
  }

  if (valid === false) {
    return (
      <>
        <p>Unable to find the model...</p>
      </>
    );
  }

  return (
    <>
      <p>Loading...</p>
    </>
  );
}
