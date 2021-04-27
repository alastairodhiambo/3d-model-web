import React from "react";
import { Link } from "react-router-dom";
import UserOptions from "./UserOptions";
import "./Header.scss";

import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { currentUser } = useAuth();
  return (
    <header>
      <div className="title">
        <Link to="/">
          <h1>ModBAse</h1>
        </Link>
      </div>
      <div className="models-link">
        <Link to="/models">
          <h2>3D Models</h2>
        </Link>
      </div>
      <UserOptions currentUser={currentUser?.email} />
    </header>
  );
}
