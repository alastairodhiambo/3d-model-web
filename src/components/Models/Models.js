import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@google/model-viewer";
import { db } from "../../firebase";

import NewModelForm from "../NewModel/NewModelForm"; // Temporary

import "./Models.scss";

export default function Models() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const unmount = db.collection("models").onSnapshot((snapshot) => {
      const tempModels = [];
      snapshot.forEach((doc) => {
        tempModels.push({ ...doc.data(), id: doc.id });
      });
      setModels(tempModels);
    });
    return unmount;
  }, []);

  return (
    <div className="main">
      <section className="content">
        {models.map((model, index) => (
          <div className="model" key={index}>
            <Link to={`/model/${model.id}`}>
              {/* <div className="model">
                <model-viewer
                  src={model.image}
                  camera-controls
                  shadow-intensity="1"
                ></model-viewer>
              </div> */}
              <img src={model.image} alt={model.name}></img>
              <h3>{model.name}</h3>
            </Link>
          </div>
        ))}
        <NewModelForm />
      </section>
    </div>
  );
}

/* 
<div className="model">
        <model-viewer
          src="./DamagedHelmet.glb"
          camera-controls
          shadow-intensity="1"
        ></model-viewer>
      </div>
*/
