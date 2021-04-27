import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@google/model-viewer";
import { db } from "../../firebase";

import Loader from "../Loader";

import "./Models.scss";

export default function Models() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unmount = db.collection("models").onSnapshot((snapshot) => {
      const tempModels = [];
      snapshot.forEach((doc) => {
        tempModels.push({ ...doc.data(), id: doc.id });
      });
      setModels(tempModels);
      setLoading(false);
    });
    return unmount;
  }, []);

  if (loading === true) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="main">
      <section className="content">
        {models.map((model, index) => (
          <div className="model" key={index}>
            <Link to={`/model/${model.id}`}>
              <img src={model.image} alt={model.name}></img>
              <h3>{model.name}</h3>
            </Link>
          </div>
        ))}

        <div className="new-model">
          <Link to={`/new-model`}>New Model</Link>
        </div>
      </section>
    </div>
  );
}
