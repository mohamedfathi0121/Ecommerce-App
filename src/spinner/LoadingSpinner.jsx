import React from "react";

export default function LoadingSpinner() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 56px)",
  };

  const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "6px solid #ddd",
    borderTop: "6px solid black",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const textStyle = {
    marginTop: "10px",
    fontSize: "18px",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <h2 style={textStyle}>loading...</h2>

      {/* Define keyframes directly in the component using a style tag */}
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
