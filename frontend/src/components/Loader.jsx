import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading = true, size = 35 }) => {
  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <ClipLoader color="#e74c3c" loading={loading} size={size} />
    </div>
  );
};

export default Loader;