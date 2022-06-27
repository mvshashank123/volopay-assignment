import React from "react";

const AppHeader = () => {
  return (
    <div className="d-flex p-3 ml-3 justify-content-between">
      <div className="d-flex align-items-center justify-content-center">
        <h2 className="fw-bold">Virtual Cards</h2>
        <div>
          <button
            className="btn btn-light ml-3 text-primary p-1"
            style={{ lineHeight: "15px" }}
          >
            <span style={{ fontSize: "12px" }}>Learn more</span>
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <button className="btn btn-light ml-3 shadow-lg fw-bold">
        <span style={{ fontSize: "14px" }}> + Virtual  card</span>
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
