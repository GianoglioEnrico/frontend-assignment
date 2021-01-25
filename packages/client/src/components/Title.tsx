import React from "react";

function Title() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          color: "rgb(249, 76, 67)",
          fontWeight: 400,
          fontSize: "3em",
        }}
      >
        Welcome!
      </h1>
      <h3 style={{ color: "rgb(112, 114, 114)" }}>
        In this page you can search for pokemons by inserting name of filtering
        by type
      </h3>
    </div>
  );
}
export default Title;
