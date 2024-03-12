import React, { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

function Loading() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:'100px'}}>
      <div className="sweet-loading text-center">
        <PacmanLoader
          color="#22F291"
          loading={loading}
          css=""
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
export default Loading;
