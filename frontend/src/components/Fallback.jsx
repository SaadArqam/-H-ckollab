import React from "react";

const Fallback = ({ message }) => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>{message || "Unable to load content."}</h2>
    </div>
  );
};

export default Fallback;