import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { db } from "../../firebase";
import "@google/model-viewer";

import EditModel from "./EditModel";
import Loader from "../Loader";

import { useAuth } from "../../contexts/AuthContext";

import "./Model.scss";

export default function Model() {
  const [image, setImage] = useState("");
  const [modelName, setModelName] = useState("");
  const [valid, setValid] = useState(null);
  const { currentUser } = useAuth();

  const match = useRouteMatch("/model/:id");
  const model = match.params.id;

  useEffect(() => {
    const unmount = db
      .collection("models")
      .doc(model)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setImage(doc.data()?.model || "");
          setModelName(doc.data()?.name);
          setValid(true);
        } else {
          setValid(false);
        }
      });
    return unmount;
  }, []);

  if (valid) {
    const ModelInfo = () => {
      if (currentUser) {
        return <EditModel currentModel={model} name={modelName} />;
      } else {
        return null;
      }
    };

    return (
      <section className="model-content">
        <h1 className="model-name">{modelName}</h1>
        <div className="model-view">
          <div className="model">
            <model-viewer src={image} camera-controls shadow-intensity="1">
              <div className="progress-bar hide" slot="progress-bar">
                <div className="update-bar"></div>
              </div>
            </model-viewer>
          </div>
        </div>
        <ModelInfo />
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
      <Loader />
    </>
  );
}
