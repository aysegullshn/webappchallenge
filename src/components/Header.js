import React from "react";
import { useHistory } from "react-router-dom";
function Header() {
  const history = useHistory();
  return (
    <div className="header w-100">
      <div className="p-3 bg-primary">
        <div className="container d-flex justify-content-between align-items-center">
          <h3
            className="text-white"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          >
            WEB APP CHALLANGE
          </h3>
          <button
            className="btn btn-primary"
            onClick={(e) => history.push("/about")}
          >
            Hakkımızda
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
