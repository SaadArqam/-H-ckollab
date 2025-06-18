import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div style={{ color: "red", padding: "1rem", textAlign: "center" }}>
      {message || "Oops! Something went wrong."}
    </div>
  );
};

export default ErrorMessage;